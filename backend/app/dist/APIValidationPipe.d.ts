import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class APIValidationPipe implements PipeTransform<any> {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
}
