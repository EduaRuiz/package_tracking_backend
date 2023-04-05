import { ShipmentDomainEntity } from '.';
import { IStatusDomainEntity } from './interfaces';

export class StatusDomainEntity implements IStatusDomainEntity {
  id?: string;
  name: string;
  description: string;
  shipment?: [ShipmentDomainEntity];
}
