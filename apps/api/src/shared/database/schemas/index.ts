import { Admin, AdminSchema } from './admin.schema';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from './phishing-attempts.schema';

export const MONGO_SCHEMAS = [
  { name: Admin.name, schema: AdminSchema },
  { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
];
