class 발행기관 {
  #state;
  #observers = new Set();

  constructor(state) {
    this.#state = state;

    // 아래의 구문 이해가 안가서 따로 찾아봄 - https://blog.woolta.com/categories/3/posts/143
    // ES5 스펙에서 생긴 Object.defineProperty() 는 객체에 직접 새로운 속성을 정의하거나 이미 존재하는 속성을 수정하고, 수정된 객체를 리턴한다.
    Object.keys(state).forEach((key) =>
      Object.defineProperty(this, key, {
        get: () => this.#state[key],
      })
    );
  }

  내부변화생김(newState) {
    this.#state = { ...this.#state, ...newState };
    this.구독자에게_알림()
  }

  구독자_등록(subscriber) {
    this.#observers.add(subscriber);
  }

  구독자에게_알림() {
    this.#observers.forEach((fn) => fn());
  }
}

module.exports = 발행기관;
