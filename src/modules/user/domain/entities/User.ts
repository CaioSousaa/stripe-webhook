interface UserProps {
  name: string;
  email: string;
  created_at: Date;
  stripeSubStatus?: string;
  stripeUserId?: string;
  stripeSubId?: string;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get stripeSubStatus(): string | undefined {
    return this.props.stripeSubStatus;
  }

  set stripeSubStatus(stripeSubStatus: string | undefined) {
    this.props.stripeSubStatus = stripeSubStatus;
  }

  get stripeUserId(): string | undefined {
    return this.props.stripeUserId;
  }

  get stripeSubId(): string | undefined {
    return this.props.stripeSubId;
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
