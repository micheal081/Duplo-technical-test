import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TimeoutError } from 'rxjs';

import { NewTaxDto } from './dto/tax-dto';
import { TaxData } from './types';

import { HttpService } from '@/resources/http/http.service';

@Injectable()
export class BeeceptorService {
  constructor(private readonly http: HttpService) {}

  async logTax(taxData: NewTaxDto): Promise<TaxData> {
    try {
      const responsePromise = this.http.fetch({
        url: `https://taxes.free.beeceptor.com/log-tax`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: taxData,
        responseType: 'json',
        validateStatus: () => true,
      });

      // Set a timeout for the response
      const response = await Promise.race([
        responsePromise,
        new Promise(
          (_, reject) => setTimeout(() => reject(new TimeoutError()), 20000), // Timeout after 20 seconds
        ),
      ]);

      if (response instanceof TimeoutError) {
        // If the request times out, throw an error
        throw new HttpException('API request timed out', HttpStatus.GATEWAY_TIMEOUT);
      }

      const responseData: TaxData = (response as { data: TaxData }).data;

      return responseData;
    } catch (error) {
      // Catch any errors and rethrow them
      throw new HttpException('Error processing API request', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
