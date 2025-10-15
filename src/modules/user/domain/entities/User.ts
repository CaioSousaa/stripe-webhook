interface UserProps {
  name: string;
  email: string;
  created_at: Date;
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

  get created_at(): Date {
    return this.props.created_at;
  }
}
