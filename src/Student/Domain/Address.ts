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

  constructor(
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
    this.recoveryDomainErrors();
  }

  protected recoveryDomainErrors(): void {
    this.addDomainErrors(this.street.getDomainErrors());
    this.addDomainErrors(this.neighborhood.getDomainErrors());
    this.addDomainErrors(this.city.getDomainErrors());
    this.addDomainErrors(this.state.getDomainErrors());
    this.addDomainErrors(this.reference.getDomainErrors());
  }
}
