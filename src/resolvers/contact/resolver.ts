import { Resolver, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { FieldError } from "../../utils/fieldError";
import { sendEmail } from "../../utils/sendEmail";
import EmailTypes from "./types";

@ObjectType()
class ContactResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field({ nullable: true })
  send?: boolean;
}

@Resolver()
export class ContactResolver {
  @Mutation(() => ContactResponse)
  async contact(@Arg("options") options: EmailTypes): Promise<ContactResponse> {
    try {
      await sendEmail({
        name: options.name,
        from: options.email,
        subject: options.subject,
        message: options.message,
      });
      const send = true;
      return { send };
    } catch (err) {
      throw new Error(err);
    }
  }
}
