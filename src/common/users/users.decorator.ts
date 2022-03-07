import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { CreateUserDto } from './dto/createUser.dto';

export function IsPasswordMatch(property: string, validationOptions?: ValidationOptions) {
  return function (object: CreateUserDto, propertyName: string) {
    registerDecorator({
      name: 'IsPasswordMatch',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as unknown)[relatedPropertyName];

          return typeof value === 'string' && typeof relatedValue === 'string' && value === relatedValue;
        },
        defaultMessage() {
          return 'Password don`t match';
        },
      },
    });
  };
}
