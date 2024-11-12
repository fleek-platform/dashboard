import { routes } from '@fleek-platform/utils-routes';

import { constants } from '@/constants';

type GetLinkForTemplateReportArgs = {
  name: string;
  templateId: string;
  userEmail?: string | null;
};

export const getLinkForTemplateReport = ({ name, templateId, userEmail }: GetLinkForTemplateReportArgs): string => {
  const ticketFormId = 'ticket_form_id=20459864851469';
  const templateName = `tf_20463899807629=${name}`;
  const templateUrl = `tf_20464104116621=${window.location.origin}${routes.template.indexed({ templateId })}`;
  const subject = 'tf_subject=Abusive Template Report';
  const email = userEmail && `tf_anonymous_requester_email=${userEmail}`;

  const params = [ticketFormId, templateUrl, templateName, email, subject].filter(Boolean).join('&');

  return `${constants.EXTERNAL_LINK.FLEEK_SUPPORT_NEW_TICKET}?${params}`;
};
