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
  protected studentId: Uuid;

  constructor(
    id: Uuid,
    street: Street,
    neighborhood: Neighborhood,
    city: City,
    state: State,
    reference: Reference,
    studentId: Uuid
  ) {
    super(id);
    this.street = street;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.reference = reference;
    this.studentId = studentId;
    this.checkIfItIsEmpty();
  }

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

  public getStudentId(): Uuid {
    return this.studentId;
  }

  public recoveryDomainErrors(): void {
    if(this.isEmpty()) return;

    this.addDomainErrors(this.id.getDomainErrors());
    this.addDomainErrors(this.street.getDomainErrors());
    this.addDomainErrors(this.neighborhood.getDomainErrors());
    this.addDomainErrors(this.city.getDomainErrors());
    this.addDomainErrors(this.state.getDomainErrors());
    this.addDomainErrors(this.reference.getDomainErrors());
    this.addDomainErrors(this.studentId.getDomainErrors());
  }
  
  protected checkIfItIsEmpty(): void {
    this.setEmpty(
      this.id.isEmpty() &&
      this.street.isEmpty() &&
      this.neighborhood.isEmpty() &&
      this.city.isEmpty() &&
      this.state.isEmpty() &&
      this.reference.isEmpty() &&
      this.studentId.isEmpty()
    );
  }

  public static getEmptyObject(): Address {
    return new Address(
      new Uuid("", Address.getEntityName()),
      new Street("", Address.getEntityName()),
      new Neighborhood("", Address.getEntityName()),
      new City("", Address.getEntityName()),
      new State("", Address.getEntityName()),
      new Reference("", Address.getEntityName()),
      new Uuid("", Address.getEntityName())
    );
  }
  static getEntityName(): string {
    return "Address";
  }
}
