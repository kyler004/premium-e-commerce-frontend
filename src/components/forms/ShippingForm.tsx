import type { ShippingAddress } from '../../types/api';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ShippingFormProps {
    onSubmit: (shipping: ShippingAddress) => void;
    loading?: boolean;
}

const ShippingForm = ({ onSubmit, loading }: ShippingFormProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        onSubmit({
            full_name: form.get('full_name') as string,
            address_line1: form.get('address_line1') as string,
            address_line2: (form.get('address_line2') as string) || undefined,
            city: form.get('city') as string,
            postal_code: form.get('postal_code') as string,
            country: form.get('country') as string,
            phone: (form.get('phone') as string) || undefined,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-border bg-surface p-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Shipping Details</h2>
            <Input label="Full Name" name="full_name" required />
            <Input label="Address Line 1" name="address_line1" required />
            <Input label="Address Line 2" name="address_line2" />
            <div className="grid grid-cols-2 gap-4">
                <Input label="City" name="city" required />
                <Input label="Postal Code" name="postal_code" required />
            </div>
            <Input label="Country" name="country" required defaultValue="FR" />
            <Input label="Phone" name="phone" type="tel" />
            <Button type="submit" fullWidth loading={loading}>Place Order</Button>
        </form>
    );
};

export default ShippingForm;
