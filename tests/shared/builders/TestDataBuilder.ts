export class UserBuilder {
  private username: string = 'standard_user';
  private password: string = 'secret_sauce';

  static standard(): UserBuilder {
    return new UserBuilder();
  }

  static invalid(): UserBuilder {
    return new UserBuilder()
      .withUsername('standard_user_123')
      .withPassword('secret_sauce_123');
  }

  withUsername(username: string): this {
    this.username = username;
    return this;
  }

  withPassword(password: string): this {
    this.password = password;
    return this;
  }

  build() {
    return {
      username: this.username,
      password: this.password
    };
  }
}

export class CustomerBuilder {
  private firstName: string = 'John';
  private lastName: string = 'Dou';
  private postalCode: string = '12345';

  static default(): CustomerBuilder {
    return new CustomerBuilder();
  }

  withFirstName(firstName: string): this {
    this.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): this {
    this.lastName = lastName;
    return this;
  }

  withPostalCode(postalCode: string): this {
    this.postalCode = postalCode;
    return this;
  }

  build() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      postalCode: this.postalCode
    };
  }
}

export class ProductBuilder {
  static BACKPACK = 'Sauce Labs Backpack';
  static BIKE_LIGHT = 'Sauce Labs Bike Light';

  static getProducts() {
    return {
      BACKPACK: this.BACKPACK,
      BIKE_LIGHT: this.BIKE_LIGHT
    };
  }
} 