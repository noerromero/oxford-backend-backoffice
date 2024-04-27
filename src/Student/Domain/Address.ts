import { EntityBase } from "../../Shared/Domain/EntityBase";
import { City } from "../../Shared/Domain/ValueObject/Address/City";
import { Neighborhood } from "../../Shared/Domain/ValueObject/Address/Neighborhood";
import { Reference } from "../../Shared/Domain/ValueObject/Address/Reference";
import { State } from "../../Shared/Domain/ValueObject/Address/State";
import { Street } from "../../Shared/Domain/ValueObject/Address/Street";
import { Uuid } from "../../Shared/Domain/ValueObject/Primitives/Uuid";

export class Address extends EntityBase<Uuid> {
  protected street: Street;
  protected neighborhood: Neighborhood;
  protected city: City;
  protected state: State;
  protected reference: Reference;

  //#region Constructors
  private constructor(
    id: Uuid,
    street: Street,
    neighborhood: Neighborhood,
    city: City,
    state: State,
    reference: Reference
  ) {
    super(id);
    this.street = street;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.reference = reference;
    this.checkIfItIsEmpty();
  }

  public static create(
    id: string,
    street: string,
    neighborhood: string,
    city: string,
    state: string,
    reference: string
  ): Address {
    return new Address(
      new Uuid(id, Address.getDomainTag()),
      new Street(street, Address.getDomainTag()),
      new Neighborhood(neighborhood, Address.getDomainTag(), true),
      new City(city, Address.getDomainTag()),
      new State(state, Address.getDomainTag()),
      new Reference(reference, Address.getDomainTag(), true)
    );
  }

  public static fromPrimitives(plainData: {
    id: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    reference: string;
  }): Address {
    return new Address(
      new Uuid(plainData.id, Address.getDomainTag()),
      new Street(plainData.street, Address.getDomainTag()),
      new Neighborhood(plainData.neighborhood, Address.getDomainTag(), true),
      new City(plainData.city, Address.getDomainTag()),
      new State(plainData.state, Address.getDomainTag()),
      new Reference(plainData.reference, Address.getDomainTag(), true)
    );
  }
  //#endregion Constructors

  public getId(): Uuid {
    return this.id;
  }

  public getStreet(): Street {
    return this.street;
  }

  public getNeighborhood(): Neighborhood {
    return this.neighborhood;
  }

  public getCity(): City {
    return this.city;
  }

  public getState(): State {
    return this.state;
  }

  public getReference(): Reference {
    return this.reference;
  }

  public recoverCommonDomainErrors(): void {
    if (this.isEmpty()) return;

    this.addDomainErrors(this.id.getDomainErrors());
    this.addDomainErrors(this.street.getDomainErrors());
    this.addDomainErrors(this.neighborhood.getDomainErrors());
    this.addDomainErrors(this.city.getDomainErrors());
    this.addDomainErrors(this.state.getDomainErrors());
    this.addDomainErrors(this.reference.getDomainErrors());
  }

  protected checkIfItIsEmpty(): void {
    this.setEmpty(
      this.id.isEmpty() &&
        this.street.isEmpty() &&
        this.neighborhood.isEmpty() &&
        this.city.isEmpty() &&
        this.state.isEmpty() &&
        this.reference.isEmpty()
    );
  }

  public static getEmptyObject(): Address {
    return new Address(
      new Uuid("", Address.getDomainTag()),
      new Street("", Address.getDomainTag()),
      new Neighborhood("", Address.getDomainTag()),
      new City("", Address.getDomainTag()),
      new State("", Address.getDomainTag()),
      new Reference("", Address.getDomainTag()),
    );
  }
  static getDomainTag(): string {
    return "Address";
  }
}
