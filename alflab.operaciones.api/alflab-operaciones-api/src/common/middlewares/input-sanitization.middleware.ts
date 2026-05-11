import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class InputSanitizationMiddleware implements NestMiddleware {
  private readonly dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript\s*:/gi,
    /on\w+\s*=/gi,
    /<\s*iframe/gi,
    /<\s*object/gi,
    /<\s*embed/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
  ];

  use(req: Request, res: Response, next: NextFunction) {
    const body = JSON.stringify(req.body);

    const esPeligroso = this.dangerousPatterns.some((pattern) =>
      pattern.test(body),
    );

    if (esPeligroso) {
      throw new BadRequestException(
        'La petición contiene contenido no permitido.',
      );
    }

    next();
  }
}