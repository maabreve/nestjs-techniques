import {
  Injectable,
  ArgumentMetadata,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class HttpPostValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    // check body
    if (value instanceof Object && Object.keys(value).length === 0) {
      throw new HttpException(
        'Validation failed: No body submitted',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!metatype || !this.validateType(metatype)) {
      return value;
    }

    // validate the value object
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(
        `Invalid object: ${this.getErrorMessage(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }

  private validateType(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => type === metatype);
  }

  private getErrorMessage(errors: any[]) {
    return errors
      .map(err => {
        err.constraints.map(e => {
          return err.constraints[e]
        })
        // for (let property in err.constraints) {
        //   return err.constraints[property];
        // }
      })
      .join(', ');
  }
}