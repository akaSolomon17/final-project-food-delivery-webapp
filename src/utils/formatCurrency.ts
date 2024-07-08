export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN').format(amount);
};

    // FORMAT VND CURRENCY
export const formatVnCurrency = (amount: number) => {
    return amount?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}