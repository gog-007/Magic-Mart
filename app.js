let totalCost = 0.00;
let totalItems = 0;
let potionStock = 3; 
let couponApplied = 0; 
function updateCartUI() {
    let finalTotal = totalCost;
    if (couponApplied === 1) { 
        finalTotal = totalCost * 0.90;
    } else if (couponApplied === 2) { 
        finalTotal = totalCost * 0.75;
    }
    document.getElementById('item-count').textContent = totalItems;
    document.getElementById('total-display').textContent = finalTotal.toFixed(2);
    const checkoutBtn = document.getElementById('checkout-btn');
    if (totalItems > 0) {
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = `Proceed to Checkout (${finalTotal.toFixed(2)} GS)`;
    } else {
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Proceed to Checkout';
    }
}
function addItem(price, buttonId) {
    totalCost += price;
    totalItems++;
    const btn = document.getElementById(buttonId);
    btn.textContent = 'Added! (+1 Again)';
    updateCartUI();
}
function addPotion() {
    const btn = document.getElementById('btn-potion');
    const stockText = document.getElementById('stock-potion');
    const card = document.getElementById('card-potion');

    if (potionStock > 0) {
        addItem(35.00, 'btn-potion');
        potionStock--;
        if (potionStock === 0) {
            btn.disabled = true;
            btn.textContent = 'Sold Out: Reborn Next Moon Cycle';
            stockText.textContent = 'SOLD OUT!';
            card.classList.add('sold-out-card');
        } else {
            stockText.textContent = `Only ${potionStock} left!`;
        }
    }
}
function addScroll() {
    addItem(50.00, 'btn-scroll');
}
function addGeode() {
    addItem(15.50, 'btn-geode');
}
function addAmulet() {
    addItem(65.00, 'btn-amulet');
}
function handleCouponInput() {
    const input = document.getElementById('coupon-input');
    const msg = document.getElementById('coupon-message');
    const code = input.value.toUpperCase();
    
    msg.classList.remove('hidden-msg', 'error-msg', 'success-msg');
    
    if (code === 'FIRE10') {
        couponApplied = 1;
        msg.textContent = 'Discount: 10% Applied!';
        msg.classList.add('success-msg');
    } else if (code === 'ICE25') {
        couponApplied = 2;
        msg.textContent = 'Discount: 25% Applied!';
        msg.classList.add('success-msg');
    } else if (code.length > 0) {
        couponApplied = 0; 
        msg.textContent = 'Invalid Glyph. Try again.';
        msg.classList.add('error-msg');
        setTimeout(() => {
            msg.classList.add('hidden-msg');
        }, 3000);
    } else {
        couponApplied = 0;
        msg.classList.add('hidden-msg');
    }
    updateCartUI(); 
}
function handleCheckout() {
    const checkoutMsg = document.getElementById('checkout-message');
    checkoutMsg.textContent = `Order placed! Total: ${document.getElementById('total-display').textContent} GS.`;
    checkoutMsg.classList.remove('hidden-msg');
    checkoutMsg.classList.add('success-msg');
    totalCost = 0.00;
    totalItems = 0;
    couponApplied = 0;
    document.getElementById('coupon-input').value = '';
    updateCartUI();
    setTimeout(() => {
        checkoutMsg.classList.add('hidden-msg');
        checkoutMsg.classList.remove('success-msg');
    }, 4000);
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-potion').onclick = addPotion;
    document.getElementById('btn-scroll').onclick = addScroll;
    document.getElementById('btn-geode').onclick = addGeode;
    document.getElementById('btn-amulet').onclick = addAmulet;
    document.getElementById('coupon-input').onkeyup = handleCouponInput;
    document.getElementById('checkout-btn').onclick = handleCheckout;
    updateCartUI();
});