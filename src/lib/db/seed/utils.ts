import {
  randAvatar,
  randEmail,
  randFullName,
  randJobTitle,
  randLine,
  randPhoneNumber,
  randUserName,
} from '@ngneat/falso';
import { getDate, getMonth, set } from 'date-fns';
import ramdon from 'lodash/random';
import sample from 'lodash/sample';

import { NewCustomer, NewEvent } from '@/lib/db/schema';

export const generateDates = () => {
  const date = new Date();
  const day = ramdon(getDate(date), 31);
  const month = ramdon(getMonth(date), 12);
  const hours = ramdon(9, 14);

  return {
    start: set(new Date(), {
      month: month,
      date: day,
      hours: hours,
      minutes: sample([0, 15, 30, 45]),
    }),
    end: set(new Date(), {
      month: month,
      date: day,
      hours: ramdon(hours + 1, hours + 3),
      minutes: sample([0, 15, 30, 45]),
    }),
  };
};

export const generateCustomer = ({
  organizationId,
  memberId,
}: {
  organizationId: string;
  memberId: string;
}): NewCustomer => ({
  name: randUserName(),
  displayName: randFullName(),
  email: randEmail(),
  phoneNumber: randPhoneNumber({ countryCode: 'ES' }),
  image: randAvatar(),
  organizationId,
  memberId,
});

export const generateEvent = ({
  organizationId,
  memberId,
  customerId,
}: {
  organizationId: string;
  memberId: string;
  customerId: string;
}): NewEvent => ({
  title: randJobTitle(),
  description: randLine(),
  allDay: false,
  color: sample(['sky', 'emerald', 'violet', 'rose', 'orange']),
  organizationId,
  memberId,
  customerId,
  ...generateDates(),
});
