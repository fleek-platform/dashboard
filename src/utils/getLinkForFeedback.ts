import { constants } from '@/constants';

type GetLinkForFeedbackArgs = {
  email?: string | null;
};

export const getLinkForFeedback = ({ email: emailArg }: GetLinkForFeedbackArgs): string => {
  const ticketFormId = 'ticket_form_id=16049246996237';
  const subject = `tf_subject=Product Feedback`;
  const email = emailArg && `tf_anonymous_requester_email=${emailArg}`;
  const product = `tf_16049078106253=fleek.xyz`;

  const params = [ticketFormId, email, subject, product]
    .filter(Boolean)
    .map((param) => (param as string).split('=').map(encodeURIComponent).join('='))
    .join('&');

  return `${constants.EXTERNAL_LINK.FLEEK_SUPPORT_NEW_TICKET}?${params}`;
};
