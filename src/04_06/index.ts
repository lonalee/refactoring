class Order {
    constructor() {

    }
    quantity: 10
    itemPrice: 1000

    discountedPrice(basePrice) {
        switch (this.discountLevel) {
            case 1: return basePrice * 0.95
            case 2: return basePrice * 0.9
        }
    }

    // "임시 변수를 질의 함수로 바꾸기" 적용
    /**
     * 1. 임시 변수 -> let discountLevel
     * 2. get discountLevel
     * 3. 기존의 let 선언, 조건문 제거
     * 4. (영향) discountLevel의 리턴값을 discountedPrice의 매개변수로 넘길 필요가 없어졌다.
     * 5. discountedPrice에서 직접 호출하면 된다.
     */
    get discountLevel() {
        return this.quantity > 100 ? 2:1
    }


    get finalPrice() {
        const basePrice = this.quantity * this.itemPrice;
        
        return this.discountedPrice(basePrice);
    }
}

