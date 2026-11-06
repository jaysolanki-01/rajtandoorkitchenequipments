import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { seo } from '../config/site';
import { useCart, type CartItem } from '../store/CartContext';
import { useAuth } from '../store/AuthContext';
import { api, ApiError } from '../api/client';

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = 'info' | 'address' | 'delivery' | 'payment';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  saveInfo: boolean;
}

interface AddressForm {
  fullName: string;
  phone: string;
  pinCode: string;
  houseFlatBuilding: string;
  streetArea: string;
  landmark: string;
  city: string;
  state: string;
  addressType: 'home' | 'office' | 'other';
  saveAddress: boolean;
  gstin: string;
  companyName: string;
}

type DeliveryOption = 'standard' | 'bulk_enquiry';
type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';

interface CouponState {
  inputCode: string;
  appliedCode: string | null;
  discount: number;
  status: 'idle' | 'checking' | 'applied' | 'invalid' | 'expired';
  errorMsg: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

// Illustrative demo coupons – replace with real API-driven coupons from the admin panel
const DEMO_COUPONS = [
  {
    code: 'WELCOME10',
    badge: 'Recommended',
    badgeColor: 'green',
    label: '10% OFF',
    description: 'Get 10% off your eligible first order.',
    footer: 'Example offer · Terms apply',
    type: 'percent' as const,
    value: 10,
    minOrder: 5000,
  },
  {
    code: 'SAVE500',
    badge: 'Suggested',
    badgeColor: 'blue',
    label: '₹500 OFF',
    description: 'Save ₹500 on qualifying orders above ₹15,000.',
    footer: 'Example offer · Terms apply',
    type: 'fixed' as const,
    value: 500,
    minOrder: 15000,
  },
  {
    code: 'BULKDEAL',
    badge: 'Bulk Order',
    badgeColor: 'gold',
    label: 'SPECIAL OFFER',
    description: 'Special bulk-order discount for eligible commercial purchases.',
    footer: 'Example offer · Terms apply',
    type: 'percent' as const,
    value: 15,
    minOrder: 50000,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const isValidPhone = (p: string) => /^[6-9]\d{9}$/.test(p.replace(/[\s\-()+ ]/g, ''));
const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
const isValidPIN = (p: string) => /^[1-9][0-9]{5}$/.test(p.trim());
const isValidGSTIN = (g: string) =>
  !g || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(g.trim());

function calcDiscount(
  coupon: (typeof DEMO_COUPONS)[number] | undefined,
  subtotal: number | null,
): number {
  if (!coupon || subtotal === null || subtotal < coupon.minOrder) return 0;
  if (coupon.type === 'percent') return Math.round((subtotal * coupon.value) / 100);
  return Math.min(coupon.value, subtotal);
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CoOrderSummary({
  items,
  subtotal,
  shippingCharge,
  couponDiscount,
  finalTotal,
  appliedCoupon,
}: {
  items: CartItem[];
  subtotal: number | null;
  shippingCharge: number;
  couponDiscount: number;
  finalTotal: number | null;
  appliedCoupon: string | null;
}) {
  return (
    <div className="co-summary__body">
      <ul className="co-summary__items" role="list">
        {items.map((item) => (
          <li key={item.product.id} className="co-summary__item">
            <div className="co-summary__thumb-wrap" aria-hidden="true">
              {item.product.image ? (
                <img src={item.product.image} alt="" className="co-summary__thumb" />
              ) : (
                <div className="co-summary__thumb-placeholder" />
              )}
              <span className="co-summary__qty-badge">{item.quantity}</span>
            </div>
            <div className="co-summary__item-info">
              <span className="co-summary__item-name">{item.product.name}</span>
              {item.product.sku && <span className="co-summary__item-sku">SKU: {item.product.sku}</span>}
            </div>
            <span className="co-summary__item-price">
              {item.product.price !== null
                ? `₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
                : 'On request'}
            </span>
          </li>
        ))}
      </ul>

      <dl className="co-summary__totals">
        <div className="co-summary__row">
          <dt>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''})</dt>
          <dd>{subtotal !== null ? `₹${subtotal.toLocaleString('en-IN')}` : 'On request'}</dd>
        </div>
        <div className="co-summary__row">
          <dt>Shipping</dt>
          <dd>{shippingCharge === 0 ? <span className="co-summary__free">FREE</span> : `₹${shippingCharge.toLocaleString('en-IN')}`}</dd>
        </div>
        {couponDiscount > 0 && (
          <div className="co-summary__row co-summary__row--discount">
            <dt>Coupon ({appliedCoupon})</dt>
            <dd>−₹{couponDiscount.toLocaleString('en-IN')}</dd>
          </div>
        )}
        <div className="co-summary__row co-summary__row--total">
          <dt>Total <span className="co-summary__gst-note">(Incl. GST)</span></dt>
          <dd>{finalTotal !== null ? `₹${finalTotal.toLocaleString('en-IN')}` : 'On request'}</dd>
        </div>
      </dl>

      <Link to="/cart" className="co-summary__edit">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        Edit cart
      </Link>
    </div>
  );
}

function CoCouponSection({
  coupon,
  setCoupon,
  onApply,
  onRemove,
  subtotal,
}: {
  coupon: CouponState;
  setCoupon: React.Dispatch<React.SetStateAction<CouponState>>;
  onApply: (code: string) => void;
  onRemove: () => void;
  subtotal: number | null;
}) {
  const [offersOpen, setOffersOpen] = useState(false);

  return (
    <div className="co-coupon">
      <h3 className="co-coupon__title">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
        Apply Coupon
      </h3>

      {coupon.appliedCode ? (
        <div className="co-coupon__applied" role="status">
          <div className="co-coupon__applied-inner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span><strong>{coupon.appliedCode}</strong> applied — saving ₹{coupon.discount.toLocaleString('en-IN')}</span>
          </div>
          <button type="button" className="co-coupon__remove" onClick={onRemove} aria-label="Remove coupon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Remove
          </button>
        </div>
      ) : (
        <>
          <p className="co-coupon__hint">Have a promotional code? Enter it below.</p>
          <div className="co-coupon__manual">
            <input
              type="text"
              className="form-input co-coupon__input"
              placeholder="Enter coupon code"
              value={coupon.inputCode}
              onChange={e => setCoupon(c => ({ ...c, inputCode: e.target.value.toUpperCase(), errorMsg: '', status: 'idle' }))}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onApply(coupon.inputCode); } }}
              aria-label="Coupon code"
              autoCapitalize="characters"
            />
            <button
              type="button"
              className="co-coupon__apply-btn"
              onClick={() => onApply(coupon.inputCode)}
              disabled={coupon.status === 'checking' || !coupon.inputCode.trim()}
            >
              {coupon.status === 'checking' ? (
                <span className="co-spinner co-spinner--sm" aria-hidden="true" />
              ) : 'Apply'}
            </button>
          </div>
          {(coupon.status === 'invalid' || coupon.status === 'expired') && (
            <p className="co-coupon__error" role="alert">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {coupon.errorMsg}
            </p>
          )}
        </>
      )}

      {/* Suggested coupons — collapsible */}
      {!coupon.appliedCode && (
        <div className="co-coupon__suggested">
          <button
            type="button"
            className="co-coupon__offers-toggle"
            onClick={() => setOffersOpen(o => !o)}
            aria-expanded={offersOpen}
          >
            <div className="co-coupon__offers-toggle-left">
              <span className="co-coupon__suggested-title">Available Offers</span>
              <span className="co-coupon__suggested-label">{DEMO_COUPONS.length} offers</span>
            </div>
            <svg
              className={`co-coupon__offers-chevron${offersOpen ? ' co-coupon__offers-chevron--open' : ''}`}
              width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {offersOpen && (
            <div className="co-coupon__offers-body">
              <p className="co-coupon__disclaimer">
                Illustrative examples only — actual eligibility and amounts are configured in your admin panel.
              </p>
              <ul className="co-coupon__cards" role="list">
                {DEMO_COUPONS.map(c => {
                  const eligible = subtotal === null || subtotal >= c.minOrder;
                  return (
                    <li key={c.code} className={`co-coupon__card${!eligible ? ' co-coupon__card--ineligible' : ''}`}>
                      <div className="co-coupon__card-top">
                        <span className={`co-coupon__card-badge co-coupon__card-badge--${c.badgeColor}`}>{c.badge}</span>
                        <span className="co-coupon__card-code">{c.code}</span>
                      </div>
                      <p className="co-coupon__card-label">{c.label}</p>
                      <p className="co-coupon__card-desc">{c.description}</p>
                      {!eligible && subtotal !== null && (
                        <p className="co-coupon__card-min">
                          Add ₹{(c.minOrder - subtotal).toLocaleString('en-IN')} more to unlock
                        </p>
                      )}
                      <div className="co-coupon__card-footer">
                        <span className="co-coupon__card-terms">{c.footer}</span>
                        <button
                          type="button"
                          className="co-coupon__card-apply"
                          onClick={() => onApply(c.code)}
                          disabled={!eligible || coupon.status === 'checking'}
                        >
                          Apply
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const submitted = useRef(false);
  const [step, setStep] = useState<Step>('info');
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [showGSTField, setShowGSTField] = useState(false);

  // Customer info
  const [info, setInfo] = useState<CustomerInfo>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    saveInfo: false,
  });
  const [infoErrors, setInfoErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  // Delivery address
  const [addr, setAddr] = useState<AddressForm>({
    fullName: user?.name ?? '',
    phone: user?.phone ?? '',
    pinCode: '',
    houseFlatBuilding: '',
    streetArea: '',
    landmark: '',
    city: '',
    state: '',
    addressType: 'home',
    saveAddress: false,
    gstin: '',
    companyName: '',
  });
  const [addrErrors, setAddrErrors] = useState<Partial<Record<keyof AddressForm, string>>>({});
  const [pinStatus, setPinStatus] = useState<'idle' | 'checking' | 'ok' | 'unavailable'>('idle');

  // Billing address
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [billingLine, setBillingLine] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingPin, setBillingPin] = useState('');

  // Delivery & payment
  const [delivery, setDelivery] = useState<DeliveryOption>('standard');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [payMethod, setPayMethod] = useState<PaymentMethod>('upi');

  // Coupon
  const [coupon, setCoupon] = useState<CouponState>({
    inputCode: '',
    appliedCode: null,
    discount: 0,
    status: 'idle',
    errorMsg: '',
  });

  // Hide site header & footer on checkout for minimal distraction
  useEffect(() => {
    document.body.classList.add('is-checkout');
    return () => document.body.classList.remove('is-checkout');
  }, []);

  if (items.length === 0 && !submitted.current) return <Navigate to="/cart" replace />;

  // ── Computed totals ──────────────────────────────────────────────────────────

  const shippingCharge = 0;
  const couponDiscount = coupon.appliedCode
    ? calcDiscount(DEMO_COUPONS.find(c => c.code === coupon.appliedCode), subtotal)
    : 0;
  const finalTotal =
    subtotal !== null ? Math.max(0, subtotal + shippingCharge - couponDiscount) : null;

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  // ── Steps ────────────────────────────────────────────────────────────────────

  const STEPS: { id: Step; label: string }[] = [
    { id: 'info', label: 'Your Details' },
    { id: 'address', label: 'Address' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'payment', label: 'Payment' },
  ];
  const stepIndex = STEPS.findIndex(s => s.id === step);

  // ── Validation ───────────────────────────────────────────────────────────────

  function validateInfo(): boolean {
    const errs: typeof infoErrors = {};
    if (!info.name.trim()) errs.name = 'Full name is required.';
    if (!isValidEmail(info.email)) errs.email = 'Enter a valid email address.';
    if (!info.phone.trim()) errs.phone = 'Mobile number is required.';
    else if (!isValidPhone(info.phone)) errs.phone = 'Enter a valid 10-digit Indian mobile number (starting 6–9).';
    setInfoErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateAddress(): boolean {
    const errs: typeof addrErrors = {};
    if (!addr.fullName.trim()) errs.fullName = 'Recipient name is required.';
    if (!addr.phone.trim()) errs.phone = 'Mobile number is required.';
    else if (!isValidPhone(addr.phone)) errs.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (!isValidPIN(addr.pinCode)) errs.pinCode = 'Enter a valid 6-digit PIN code.';
    if (!addr.houseFlatBuilding.trim()) errs.houseFlatBuilding = 'House / flat / building is required.';
    if (!addr.streetArea.trim()) errs.streetArea = 'Street / area is required.';
    if (!addr.city.trim()) errs.city = 'City is required.';
    if (!addr.state) errs.state = 'Please select a state.';
    if (addr.gstin && !isValidGSTIN(addr.gstin)) errs.gstin = 'Enter a valid 15-character GSTIN.';
    setAddrErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function goNext() {
    if (step === 'info' && validateInfo()) setStep('address');
    else if (step === 'address' && validateAddress()) setStep('delivery');
    else if (step === 'delivery') setStep('payment');
  }

  function goBack() {
    setGlobalError('');
    if (step === 'address') setStep('info');
    else if (step === 'delivery') setStep('address');
    else if (step === 'payment') setStep('delivery');
  }

  // ── PIN check ────────────────────────────────────────────────────────────────

  async function checkPin() {
    if (!isValidPIN(addr.pinCode)) return;
    setPinStatus('checking');
    try {
      await api.get(`/delivery/pin-check/${addr.pinCode.trim()}`);
      setPinStatus('ok');
    } catch {
      setPinStatus('ok'); // Optimistic when backend not yet configured
    }
  }

  // ── Coupon ───────────────────────────────────────────────────────────────────

  async function applyCoupon(code: string) {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setCoupon(c => ({ ...c, status: 'checking', errorMsg: '' }));
    await new Promise(r => setTimeout(r, 500));
    const found = DEMO_COUPONS.find(c => c.code === trimmed);
    if (!found) {
      setCoupon(c => ({ ...c, status: 'invalid', errorMsg: `"${trimmed}" is not a valid coupon code.` }));
      return;
    }
    if (subtotal !== null && subtotal < found.minOrder) {
      setCoupon(c => ({
        ...c,
        status: 'invalid',
        errorMsg: `Minimum order ₹${found.minOrder.toLocaleString('en-IN')} required for ${trimmed}.`,
      }));
      return;
    }
    const disc = calcDiscount(found, subtotal);
    setCoupon(c => ({ ...c, appliedCode: trimmed, discount: disc, status: 'applied', errorMsg: '' }));
  }

  function removeCoupon() {
    setCoupon({ inputCode: '', appliedCode: null, discount: 0, status: 'idle', errorMsg: '' });
  }

  // ── Place Order ──────────────────────────────────────────────────────────────

  async function placeOrder() {
    setGlobalError('');
    setSubmitting(true);
    try {
      const payload = {
        customerName: info.name,
        email: info.email.trim().toLowerCase(),
        phone: info.phone.trim(),
        deliveryAddress: {
          fullName: addr.fullName,
          phone: addr.phone,
          pinCode: addr.pinCode,
          address: `${addr.houseFlatBuilding}, ${addr.streetArea}${addr.landmark ? `, near ${addr.landmark}` : ''}`,
          city: addr.city,
          state: addr.state,
          country: 'India',
          addressType: addr.addressType,
          ...(addr.gstin ? { gstin: addr.gstin } : {}),
          ...(addr.companyName ? { companyName: addr.companyName } : {}),
        },
        deliveryOption: delivery,
        ...(deliveryNotes ? { deliveryNotes } : {}),
        paymentMethod: payMethod,
        ...(coupon.appliedCode ? { couponCode: coupon.appliedCode } : {}),
        items: items.map(i => ({
          productId: i.product.id,
          productName: i.product.name,
          ...(i.product.sku ? { sku: i.product.sku } : {}),
          quantity: i.quantity,
          unitPrice: i.product.price,
        })),
        subtotal,
        ...(couponDiscount ? { couponDiscount } : {}),
        shippingCharge,
        finalTotal,
      };

      let orderRef: string;
      if (isLoggedIn) {
        const result = await api.post<{ orderNumber: string }>('/orders', payload);
        orderRef = result.orderNumber;
      } else {
        // Generate local reference first so confirmation always works, even if the API is unreachable
        orderRef = `REF-${Date.now().toString(36).toUpperCase()}`;
        const enquiryItems = items.map(i => `${i.quantity}× ${i.product.name}`).join(', ');
        api.post('/quotes', {
          name: info.name,
          email: info.email.trim().toLowerCase(),
          phone: info.phone.trim(),
          requirements: `Checkout enquiry: ${enquiryItems}.${deliveryNotes ? ' Notes: ' + deliveryNotes : ''}`,
          deliveryAddress: payload.deliveryAddress,
          ...(coupon.appliedCode ? { couponCode: coupon.appliedCode } : {}),
        }).catch(() => { /* fire-and-forget – local ref is the source of truth for guests */ });
      }

      submitted.current = true;
      navigate('/checkout/confirmation', {
        state: {
          orderRef,
          isGuest: !isLoggedIn,
          customerName: info.name,
          email: info.email,
          address: `${addr.houseFlatBuilding}, ${addr.streetArea}, ${addr.city}, ${addr.state} – ${addr.pinCode}`,
          items: items.map(i => ({
            name: i.product.name,
            qty: i.quantity,
            price: i.product.price,
            slug: i.product.slug,
          })),
          subtotal,
          shippingCharge,
          couponDiscount,
          finalTotal,
          payMethod,
        },
        replace: true,
      });
      clearCart();
    } catch (err) {
      setGlobalError(
        err instanceof ApiError
          ? err.message
          : 'Order submission failed. Please try again or contact us directly.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <>
      <title>{`Checkout | ${seo.title}`}</title>
      <meta name="robots" content="noindex" />

      <div className="co-page">
        {/* Step progress bar */}
        <div className="co-steps" role="navigation" aria-label="Checkout steps">
          <div className="container">
            <ol className="co-steps__list" role="list">
              {STEPS.map((s, i) => (
                <li
                  key={s.id}
                  className={[
                    'co-steps__item',
                    s.id === step && 'co-steps__item--active',
                    i < stepIndex && 'co-steps__item--done',
                  ].filter(Boolean).join(' ')}
                  aria-current={s.id === step ? 'step' : undefined}
                >
                  <button
                    type="button"
                    className="co-steps__btn"
                    onClick={() => i < stepIndex ? (() => setStep(s.id))() : undefined}
                    disabled={i >= stepIndex}
                    aria-label={`Step ${i + 1}: ${s.label}${i < stepIndex ? ' (completed)' : ''}`}
                  >
                    <span className="co-steps__num" aria-hidden="true">
                      {i < stepIndex ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (i + 1)}
                    </span>
                    <span className="co-steps__label">{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && <span className="co-steps__connector" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Page body */}
        <main id="main" tabIndex={-1}>
          <div className="container">
            <div className="co-layout">

              {/* ── Left column: steps ── */}
              <div className="co-left">

                {/* Mobile collapsible order summary */}
                <div className="co-mobile-summary">
                  <button
                    type="button"
                    className="co-mobile-summary__toggle"
                    aria-expanded={mobileSummaryOpen}
                    onClick={() => setMobileSummaryOpen(v => !v)}
                  >
                    <span className="co-mobile-summary__toggle-left">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                      Order summary ({totalItems} item{totalItems !== 1 ? 's' : ''})
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`co-steps__chevron${mobileSummaryOpen ? ' co-steps__chevron--open' : ''}`} aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                    <span className="co-mobile-summary__toggle-right">
                      {finalTotal !== null ? `₹${finalTotal.toLocaleString('en-IN')}` : 'On request'}
                    </span>
                  </button>
                  {mobileSummaryOpen && (
                    <div className="co-mobile-summary__body">
                      <CoOrderSummary
                        items={items}
                        subtotal={subtotal}
                        shippingCharge={shippingCharge}
                        couponDiscount={couponDiscount}
                        finalTotal={finalTotal}
                        appliedCoupon={coupon.appliedCode}
                      />
                      <CoCouponSection
                        coupon={coupon}
                        setCoupon={setCoupon}
                        onApply={applyCoupon}
                        onRemove={removeCoupon}
                        subtotal={subtotal}
                      />
                    </div>
                  )}
                </div>

                {/* ── Step 1: Customer Info ── */}
                {step === 'info' && (
                  <section className="co-panel" aria-labelledby="step1-heading">
                    <h2 id="step1-heading" className="co-panel__title">
                      <span className="co-panel__step-num" aria-hidden="true">1</span>
                      Your Details
                    </h2>

                    {!isLoggedIn && (
                      <div className="co-guest-note">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <span>Checking out as guest. <button type="button" className="co-link">Sign in</button> to track your order.</span>
                      </div>
                    )}

                    <div className="co-form">
                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="co-name" className="form-label">
                            Full Name <span aria-hidden="true" className="form-required">*</span>
                          </label>
                          <input
                            id="co-name" type="text"
                            className={`form-input${infoErrors.name ? ' form-input--error' : ''}`}
                            required autoComplete="name"
                            value={info.name}
                            onChange={e => setInfo(v => ({ ...v, name: e.target.value }))}
                            placeholder="Your full name"
                          />
                          {infoErrors.name && <span className="form-error" role="alert">{infoErrors.name}</span>}
                        </div>
                        <div className="form-field">
                          <label htmlFor="co-email" className="form-label">
                            Email Address <span aria-hidden="true" className="form-required">*</span>
                          </label>
                          <input
                            id="co-email" type="email"
                            className={`form-input${infoErrors.email ? ' form-input--error' : ''}`}
                            required autoComplete="email"
                            value={info.email}
                            onChange={e => setInfo(v => ({ ...v, email: e.target.value }))}
                            placeholder="you@example.com"
                          />
                          {infoErrors.email && <span className="form-error" role="alert">{infoErrors.email}</span>}
                        </div>
                      </div>

                      <div className="form-field">
                        <label htmlFor="co-phone" className="form-label">
                          Mobile Number <span aria-hidden="true" className="form-required">*</span>
                        </label>
                        <div className="co-phone-wrap">
                          <span className="co-phone-prefix">+91</span>
                          <input
                            id="co-phone" type="tel"
                            className={`form-input co-phone-input${infoErrors.phone ? ' form-input--error' : ''}`}
                            required autoComplete="tel"
                            value={info.phone}
                            onChange={e => setInfo(v => ({ ...v, phone: e.target.value }))}
                            placeholder="98765 43210"
                            inputMode="numeric"
                            maxLength={15}
                          />
                        </div>
                        {infoErrors.phone && <span className="form-error" role="alert">{infoErrors.phone}</span>}
                      </div>

                      <label className="co-checkbox">
                        <input
                          type="checkbox"
                          checked={info.saveInfo}
                          onChange={e => setInfo(v => ({ ...v, saveInfo: e.target.checked }))}
                        />
                        <span>Save this information for future orders</span>
                      </label>
                    </div>

                    <div className="co-actions">
                      <button type="button" className="btn btn--gold btn--lg" onClick={goNext}>
                        Continue to Address
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </div>
                  </section>
                )}

                {/* ── Step 2: Delivery Address ── */}
                {step === 'address' && (
                  <section className="co-panel" aria-labelledby="step2-heading">
                    <h2 id="step2-heading" className="co-panel__title">
                      <span className="co-panel__step-num" aria-hidden="true">2</span>
                      Delivery Address
                    </h2>

                    <div className="co-form">
                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="addr-name" className="form-label">
                            Recipient Name <span aria-hidden="true" className="form-required">*</span>
                          </label>
                          <input
                            id="addr-name" type="text"
                            className={`form-input${addrErrors.fullName ? ' form-input--error' : ''}`}
                            autoComplete="name"
                            value={addr.fullName}
                            onChange={e => setAddr(v => ({ ...v, fullName: e.target.value }))}
                            placeholder="Full name of recipient"
                          />
                          {addrErrors.fullName && <span className="form-error" role="alert">{addrErrors.fullName}</span>}
                        </div>
                        <div className="form-field">
                          <label htmlFor="addr-phone" className="form-label">
                            Mobile Number <span aria-hidden="true" className="form-required">*</span>
                          </label>
                          <div className="co-phone-wrap">
                            <span className="co-phone-prefix">+91</span>
                            <input
                              id="addr-phone" type="tel"
                              className={`form-input co-phone-input${addrErrors.phone ? ' form-input--error' : ''}`}
                              autoComplete="tel"
                              value={addr.phone}
                              onChange={e => setAddr(v => ({ ...v, phone: e.target.value }))}
                              placeholder="98765 43210"
                              inputMode="numeric"
                              maxLength={15}
                            />
                          </div>
                          {addrErrors.phone && <span className="form-error" role="alert">{addrErrors.phone}</span>}
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="addr-pin" className="form-label">
                            PIN Code <span aria-hidden="true" className="form-required">*</span>
                          </label>
                          <div className="co-pin-wrap">
                            <input
                              id="addr-pin" type="text"
                              className={`form-input co-pin-input${addrErrors.pinCode ? ' form-input--error' : ''}`}
                              inputMode="numeric" maxLength={6}
                              value={addr.pinCode}
                              onChange={e => { setAddr(v => ({ ...v, pinCode: e.target.value.replace(/\D/g, '') })); setPinStatus('idle'); }}
                              placeholder="400 001"
                            />
                            <button
                              type="button"
                              className="co-pin-check-btn"
                              onClick={checkPin}
                              disabled={!isValidPIN(addr.pinCode) || pinStatus === 'checking'}
                            >
                              {pinStatus === 'checking' ? '…' : 'Check'}
                            </button>
                          </div>
                          {addrErrors.pinCode && <span className="form-error" role="alert">{addrErrors.pinCode}</span>}
                          {pinStatus === 'ok' && <span className="form-hint form-hint--ok">Delivery available for this PIN code.</span>}
                          {pinStatus === 'unavailable' && <span className="form-hint form-hint--warn">Delivery not available. Contact us for alternatives.</span>}
                        </div>
                        <div className="form-field">
                          <label htmlFor="addr-house" className="form-label">
                            House / Flat / Building <span aria-hidden="true" className="form-required">*</span>
                          </label>
                          <input
                            id="addr-house" type="text"
                            className={`form-input${addrErrors.houseFlatBuilding ? ' form-input--error' : ''}`}
                            autoComplete="address-line1"
                            value={addr.houseFlatBuilding}
                            onChange={e => setAddr(v => ({ ...v, houseFlatBuilding: e.target.value }))}
                            placeholder="House no., flat, building name"
                          />
                          {addrErrors.houseFlatBuilding && <span className="form-error" role="alert">{addrErrors.houseFlatBuilding}</span>}
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="addr-street" className="form-label">
                            Street / Area <span aria-hidden="true" className="form-required">*</span>
                          </label>
                          <input
                            id="addr-street" type="text"
                            className={`form-input${addrErrors.streetArea ? ' form-input--error' : ''}`}
                            autoComplete="address-line2"
                            value={addr.streetArea}
                            onChange={e => setAddr(v => ({ ...v, streetArea: e.target.value }))}
                            placeholder="Street, locality, area name"
                          />
                          {addrErrors.streetArea && <span className="form-error" role="alert">{addrErrors.streetArea}</span>}
                        </div>
                        <div className="form-field">
                          <label htmlFor="addr-landmark" className="form-label">
                            Landmark <span className="form-optional">(optional)</span>
                          </label>
                          <input
                            id="addr-landmark" type="text"
                            className="form-input"
                            value={addr.landmark}
                            onChange={e => setAddr(v => ({ ...v, landmark: e.target.value }))}
                            placeholder="Near a recognisable landmark"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="addr-city" className="form-label">
                            City <span aria-hidden="true" className="form-required">*</span>
                          </label>
                          <input
                            id="addr-city" type="text"
                            className={`form-input${addrErrors.city ? ' form-input--error' : ''}`}
                            autoComplete="address-level2"
                            value={addr.city}
                            onChange={e => setAddr(v => ({ ...v, city: e.target.value }))}
                            placeholder="City"
                          />
                          {addrErrors.city && <span className="form-error" role="alert">{addrErrors.city}</span>}
                        </div>
                        <div className="form-field">
                          <label htmlFor="addr-state" className="form-label">
                            State <span aria-hidden="true" className="form-required">*</span>
                          </label>
                          <select
                            id="addr-state"
                            className={`form-input form-select${addrErrors.state ? ' form-input--error' : ''}`}
                            value={addr.state}
                            onChange={e => setAddr(v => ({ ...v, state: e.target.value }))}
                          >
                            <option value="">Select state…</option>
                            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          {addrErrors.state && <span className="form-error" role="alert">{addrErrors.state}</span>}
                        </div>
                      </div>

                      <div className="form-field" style={{ maxWidth: '200px' }}>
                        <label className="form-label">Country</label>
                        <input type="text" className="form-input" value="India" readOnly disabled />
                      </div>

                      {/* Address type */}
                      <div className="form-field">
                        <span className="form-label" id="addr-type-label">Address Type</span>
                        <div className="co-addr-types" role="radiogroup" aria-labelledby="addr-type-label">
                          {(['home', 'office', 'other'] as const).map(t => (
                            <label key={t} className={`co-addr-type${addr.addressType === t ? ' co-addr-type--active' : ''}`}>
                              <input
                                type="radio" name="addrType" value={t}
                                checked={addr.addressType === t}
                                onChange={() => setAddr(v => ({ ...v, addressType: t }))}
                              />
                              {t.charAt(0).toUpperCase() + t.slice(1)}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* GST / business toggle */}
                      <button
                        type="button"
                        className="co-gst-toggle"
                        onClick={() => setShowGSTField(v => !v)}
                        aria-expanded={showGSTField}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="7" width="20" height="14" rx="2"/>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                        {showGSTField ? 'Remove GST / business details' : 'Add GSTIN for GST invoice (business purchases)'}
                      </button>

                      {showGSTField && (
                        <div className="form-row">
                          <div className="form-field">
                            <label htmlFor="addr-gstin" className="form-label">GSTIN</label>
                            <input
                              id="addr-gstin" type="text"
                              className={`form-input${addrErrors.gstin ? ' form-input--error' : ''}`}
                              value={addr.gstin}
                              onChange={e => setAddr(v => ({ ...v, gstin: e.target.value.toUpperCase() }))}
                              placeholder="22AAAAA0000A1Z5"
                              maxLength={15}
                              autoCapitalize="characters"
                            />
                            {addrErrors.gstin && <span className="form-error" role="alert">{addrErrors.gstin}</span>}
                          </div>
                          <div className="form-field">
                            <label htmlFor="addr-company" className="form-label">Company Name</label>
                            <input
                              id="addr-company" type="text"
                              className="form-input"
                              value={addr.companyName}
                              onChange={e => setAddr(v => ({ ...v, companyName: e.target.value }))}
                              placeholder="Registered business name"
                            />
                          </div>
                        </div>
                      )}

                      <label className="co-checkbox">
                        <input
                          type="checkbox"
                          checked={addr.saveAddress}
                          onChange={e => setAddr(v => ({ ...v, saveAddress: e.target.checked }))}
                        />
                        <span>Save this address for future orders</span>
                      </label>

                      <div className="co-billing-toggle">
                        <label className="co-checkbox">
                          <input
                            type="checkbox"
                            checked={sameAsBilling}
                            onChange={e => setSameAsBilling(e.target.checked)}
                          />
                          <span>Billing address same as shipping address</span>
                        </label>
                      </div>

                      {!sameAsBilling && (
                        <div className="co-billing-section">
                          <h3 className="co-billing-section__title">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
                            Billing Address
                          </h3>
                          <div className="co-form">
                            <div>
                              <label className="form-label" htmlFor="b-line">Address Line <span className="form-required">*</span></label>
                              <input id="b-line" className="form-input" value={billingLine} onChange={e => setBillingLine(e.target.value)} placeholder="House / Flat, Street, Area" autoComplete="billing address-line1" />
                            </div>
                            <div className="form-row">
                              <div>
                                <label className="form-label" htmlFor="b-city">City <span className="form-required">*</span></label>
                                <input id="b-city" className="form-input" value={billingCity} onChange={e => setBillingCity(e.target.value)} placeholder="City" autoComplete="billing address-level2" />
                              </div>
                              <div>
                                <label className="form-label" htmlFor="b-pin">PIN Code <span className="form-required">*</span></label>
                                <input id="b-pin" className="form-input" value={billingPin} onChange={e => setBillingPin(e.target.value)} placeholder="000000" inputMode="numeric" maxLength={6} autoComplete="billing postal-code" />
                              </div>
                            </div>
                            <div>
                              <label className="form-label" htmlFor="b-state">State <span className="form-required">*</span></label>
                              <select id="b-state" className="form-select" value={billingState} onChange={e => setBillingState(e.target.value)} autoComplete="billing address-level1">
                                <option value="">Select state</option>
                                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="co-actions co-actions--spaced">
                      <button type="button" className="co-back-btn" onClick={goBack}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                        Back
                      </button>
                      <button type="button" className="btn btn--gold btn--lg" onClick={goNext}>
                        Continue to Delivery
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </div>
                  </section>
                )}

                {/* ── Step 3: Delivery Options ── */}
                {step === 'delivery' && (
                  <section className="co-panel" aria-labelledby="step3-heading">
                    <h2 id="step3-heading" className="co-panel__title">
                      <span className="co-panel__step-num" aria-hidden="true">3</span>
                      Delivery Options
                    </h2>

                    <div className="co-delivery-options" role="radiogroup" aria-label="Delivery method">
                      <label className={`co-delivery-opt${delivery === 'standard' ? ' co-delivery-opt--active' : ''}`}>
                        <input
                          type="radio" name="delivery" value="standard"
                          checked={delivery === 'standard'}
                          onChange={() => setDelivery('standard')}
                        />
                        <div className="co-delivery-opt__body">
                          <div className="co-delivery-opt__top">
                            <div>
                              <span className="co-delivery-opt__name">Standard Delivery</span>
                              <span className="co-delivery-opt__estimate">Est. 7–14 business days</span>
                            </div>
                            <span className="co-delivery-opt__price co-delivery-opt__price--free">FREE</span>
                          </div>
                          <p className="co-delivery-opt__desc">Delivery timeline confirmed by our team after order review. Exact delivery window for heavy equipment shared before dispatch.</p>
                        </div>
                      </label>

                      <div className="co-delivery-opt co-delivery-opt--unavailable" aria-disabled="true">
                        <div className="co-delivery-opt__unavail-radio" aria-hidden="true" />
                        <div className="co-delivery-opt__body">
                          <div className="co-delivery-opt__top">
                            <div>
                              <span className="co-delivery-opt__name">Express Delivery</span>
                              <span className="co-delivery-opt__estimate">Contact for availability</span>
                            </div>
                            <span className="co-delivery-opt__tag">Enquire</span>
                          </div>
                          <p className="co-delivery-opt__desc">Faster delivery available for select PIN codes. Contact us to check availability and arrange.</p>
                        </div>
                      </div>

                      <label className={`co-delivery-opt${delivery === 'bulk_enquiry' ? ' co-delivery-opt--active' : ''}`}>
                        <input
                          type="radio" name="delivery" value="bulk_enquiry"
                          checked={delivery === 'bulk_enquiry'}
                          onChange={() => setDelivery('bulk_enquiry')}
                        />
                        <div className="co-delivery-opt__body">
                          <div className="co-delivery-opt__top">
                            <div>
                              <span className="co-delivery-opt__name">Bulk / Commercial Delivery</span>
                              <span className="co-delivery-opt__estimate">Special arrangement</span>
                            </div>
                            <span className="co-delivery-opt__tag co-delivery-opt__tag--gold">Commercial</span>
                          </div>
                          <p className="co-delivery-opt__desc">For large commercial orders requiring specialist logistics, installation support, or multiple unit delivery.</p>
                        </div>
                      </label>
                    </div>

                    <div className="co-heavy-note">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <span>Tandoors and commercial kitchen equipment are heavy freight items. Our team will confirm delivery details and any additional handling charges before dispatch.</span>
                    </div>

                    <div className="form-field" style={{ marginTop: '1.5rem' }}>
                      <label htmlFor="co-delivery-notes" className="form-label">
                        Delivery Instructions <span className="form-optional">(optional)</span>
                      </label>
                      <textarea
                        id="co-delivery-notes"
                        className="form-input form-textarea"
                        rows={3}
                        value={deliveryNotes}
                        onChange={e => setDeliveryNotes(e.target.value)}
                        placeholder="Gate code, floor access, preferred delivery time, special requirements…"
                      />
                    </div>

                    <div className="co-actions co-actions--spaced">
                      <button type="button" className="co-back-btn" onClick={goBack}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                        Back
                      </button>
                      <button type="button" className="btn btn--gold btn--lg" onClick={goNext}>
                        Continue to Payment
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </div>
                  </section>
                )}

                {/* ── Step 4: Payment ── */}
                {step === 'payment' && (
                  <section className="co-panel" aria-labelledby="step4-heading">
                    <h2 id="step4-heading" className="co-panel__title">
                      <span className="co-panel__step-num" aria-hidden="true">4</span>
                      Payment Method
                    </h2>

                    <div className="co-payment-notice">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <div>
                        <strong>Payment on confirmation</strong>
                        <p>Select your preferred method. Our team will share secure payment details once your order is confirmed. We never store card or account details.</p>
                      </div>
                    </div>

                    <div className="co-pay-methods" role="radiogroup" aria-label="Payment method">
                      {(
                        [
                          { id: 'upi',        label: 'UPI',                  desc: 'Google Pay, PhonePe, Paytm, BHIM UPI', abbr: 'UPI' },
                          { id: 'card',       label: 'Credit / Debit Card',  desc: 'Visa, Mastercard, RuPay',               abbr: 'CARD' },
                          { id: 'netbanking', label: 'Net Banking',          desc: 'All major Indian banks',                abbr: 'NET' },
                          { id: 'wallet',     label: 'Wallets',              desc: 'Paytm, Mobikwik, Amazon Pay',           abbr: '₿' },
                          { id: 'cod',        label: 'Cash on Delivery',     desc: 'Available on request for select orders', abbr: 'COD' },
                        ] as { id: PaymentMethod; label: string; desc: string; abbr: string }[]
                      ).map(m => (
                        <label
                          key={m.id}
                          className={`co-pay-method${payMethod === m.id ? ' co-pay-method--active' : ''}`}
                        >
                          <input
                            type="radio" name="payMethod" value={m.id}
                            checked={payMethod === m.id}
                            onChange={() => setPayMethod(m.id)}
                          />
                          <span className="co-pay-method__abbr" aria-hidden="true">{m.abbr}</span>
                          <span className="co-pay-method__body">
                            <span className="co-pay-method__label">{m.label}</span>
                            <span className="co-pay-method__desc">{m.desc}</span>
                          </span>
                          {payMethod === m.id && (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="co-pay-method__check" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                          )}
                        </label>
                      ))}
                    </div>

                    {/* Order review */}
                    <div className="co-review">
                      <h3 className="co-review__title">Review your order</h3>
                      <dl className="co-review__rows">
                        <div className="co-review__row">
                          <dt>Name</dt>
                          <dd>{info.name}</dd>
                        </div>
                        <div className="co-review__row">
                          <dt>Email</dt>
                          <dd>{info.email}</dd>
                        </div>
                        <div className="co-review__row">
                          <dt>Mobile</dt>
                          <dd>+91 {info.phone}</dd>
                        </div>
                        <div className="co-review__row">
                          <dt>Deliver to</dt>
                          <dd>{addr.houseFlatBuilding}, {addr.streetArea}, {addr.city}, {addr.state} – {addr.pinCode}</dd>
                        </div>
                        <div className="co-review__row">
                          <dt>Delivery</dt>
                          <dd>{delivery === 'standard' ? 'Standard Delivery' : 'Bulk / Commercial Delivery'}</dd>
                        </div>
                      </dl>
                      <button type="button" className="co-review__edit" onClick={() => setStep('info')}>
                        Edit details
                      </button>
                    </div>

                    {globalError && (
                      <div className="form-status form-status--error" role="alert" style={{ marginTop: '1.25rem' }}>
                        <strong>Submission failed.</strong> {globalError}
                      </div>
                    )}

                    <div className="co-actions co-actions--spaced">
                      <button type="button" className="co-back-btn" onClick={goBack}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn btn--gold btn--lg co-place-btn"
                        onClick={placeOrder}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <span className="co-spinner" aria-hidden="true" />
                            Processing…
                          </>
                        ) : (
                          <>
                            {isLoggedIn ? 'Place Order' : 'Submit Enquiry'}
                            {finalTotal !== null && ` · ₹${finalTotal.toLocaleString('en-IN')}`}
                          </>
                        )}
                      </button>
                    </div>

                    <p className="co-tnc">
                      By placing your order you agree to our{' '}
                      <Link to="/terms">Terms & Conditions</Link> and{' '}
                      <Link to="/privacy-policy">Privacy Policy</Link>.
                    </p>
                  </section>
                )}
              </div>

              {/* ── Right column: summary + coupon ── */}
              <aside className="co-right">
                <div className="co-summary-card">
                  <h2 className="co-summary-card__title">
                    Order Summary
                    <Link to="/cart" className="co-summary-card__shop-link">Edit cart</Link>
                  </h2>
                  <CoOrderSummary
                    items={items}
                    subtotal={subtotal}
                    shippingCharge={shippingCharge}
                    couponDiscount={couponDiscount}
                    finalTotal={finalTotal}
                    appliedCoupon={coupon.appliedCode}
                  />
                </div>
                <CoCouponSection
                  coupon={coupon}
                  setCoupon={setCoupon}
                  onApply={applyCoupon}
                  onRemove={removeCoupon}
                  subtotal={subtotal}
                />

                {/* Trust badges */}
                <div className="co-trust" role="list" aria-label="Security and trust">
                  <div className="co-trust__item" role="listitem">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    SSL Secured
                  </div>
                  <div className="co-trust__item" role="listitem">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    Secure Checkout
                  </div>
                  <div className="co-trust__item" role="listitem">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    No Hidden Charges
                  </div>
                  <div className="co-trust__item" role="listitem">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Quick Response
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        {/* Mobile sticky CTA (payment step only) */}
        {step === 'payment' && (
          <div className="co-sticky-bar" aria-hidden="true">
            <div className="co-sticky-bar__inner container">
              <div className="co-sticky-bar__total">
                <span>Total</span>
                <strong>{finalTotal !== null ? `₹${finalTotal.toLocaleString('en-IN')}` : 'On request'}</strong>
              </div>
              <button
                type="button"
                className="btn btn--gold"
                onClick={placeOrder}
                disabled={submitting}
              >
                {submitting ? 'Processing…' : isLoggedIn ? 'Place Order' : 'Submit Enquiry'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
