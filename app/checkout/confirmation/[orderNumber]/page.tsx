import { Suspense } from 'react';
import { OrderConfirmationPage } from '../../../../src/views/OrderConfirmationPage';

export default async function Page({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  return (
    <Suspense>
      <OrderConfirmationPage orderNumber={orderNumber} />
    </Suspense>
  );
}
