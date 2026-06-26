import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SessionStatus } from '../entities/session.entity';

export class SessionResponseDto {
  @ApiProperty({ example: 'sess_123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'my-bot' })
  name: string;

  @ApiProperty({ enum: SessionStatus, example: SessionStatus.READY })
  status: SessionStatus;

  @ApiPropertyOptional({ example: '628123456789' })
  phone?: string | null;

  @ApiPropertyOptional({ example: 'John Doe' })
  pushName?: string | null;

  @ApiPropertyOptional({ example: '2025-02-02T10:00:00Z' })
  connectedAt?: Date | null;

  @ApiPropertyOptional({ example: '2025-02-02T10:30:00Z' })
  lastActive?: Date | null;

  @ApiProperty({ example: '2025-02-02T09:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-02-02T10:00:00Z' })
  updatedAt: Date;

  @ApiPropertyOptional({
    description:
      'Human-readable reason the session is not working: an engine failure (when status is FAILED) ' +
      'or why the number disconnected (when status is DISCONNECTED, e.g. logged out / banned / replaced).',
    example: 'Logged out — the device was unlinked from the phone. Re-scan the QR code to reconnect.',
  })
  lastError?: string | null;
}

export class QRCodeResponseDto {
  @ApiProperty({
    description: 'QR code as data URL',
    example: 'data:image/png;base64,...',
  })
  qrCode: string;

  @ApiProperty({ enum: SessionStatus, example: SessionStatus.QR_READY })
  status: SessionStatus;
}
