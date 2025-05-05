import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from './useToast';
import { openPopUpWindow } from '@/utils/openPopUpWindow';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCookies } from '@/providers/CookiesProvider';
import { BackendApiClient } from '@/integrations/new-be/BackendApi';
import { useState } from 'react';

type Credits = {
  balance: number;
  projectId: string;
  teamId: string;
};

type CreditsCheckoutResponse = {
  url: string;
};

export const useCreditsCheckout = () => {
  const cookies = useCookies();
  const toast = useToast();
  const [isCheckoutSessionOpen, setIsCheckoutSessionOpen] =
    useState<boolean>(false);

  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const createCreditsCheckout = async (): Promise<CreditsCheckoutResponse> => {
    const url = '/api/v1/credits/checkout';

    const response = await backendApi.fetch({
      url,
      method: 'POST',
      body: JSON.stringify({ projectId: cookies.values.projectId }),
    });

    if (!response.ok) {
      throw response.statusText;
    }

    return await response.json();
  };

  const { refetchCredits } = useCredits();

  const createCheckoutMutation = useMutation({
    mutationFn: createCreditsCheckout,
  });

  const handleAddCredits = async ({
    onClose = () => {},
  }: { onClose?: () => void } = {}) => {
    try {
      if (createCheckoutMutation.isLoading || isCheckoutSessionOpen) return;

      const { url } =
        createCheckoutMutation.data ||
        (await createCheckoutMutation.mutateAsync());

      if (!url) {
        throw new Error('Failed to create checkout session for credits');
      }

      setIsCheckoutSessionOpen(true);

      const popUp = openPopUpWindow({
        url,
        onClose: () => {
          refetchCredits();
          setIsCheckoutSessionOpen(false);
          onClose();
        },
      });

      if (!popUp) {
        setIsCheckoutSessionOpen(false);
        return;
      }
    } catch (error) {
      toast.error({
        message: 'Failed to create checkout session, please try again later.',
      });
    }
  };

  return {
    createCheckout: createCheckoutMutation.mutate,
    createCheckoutAsync: createCheckoutMutation.mutateAsync,
    isCreatingCheckout:
      createCheckoutMutation.isLoading || isCheckoutSessionOpen,
    handleAddCredits,
  };
};

export const useCredits = () => {
  const cookies = useCookies();
  const backendApi = new BackendApiClient({
    accessToken: cookies.values.accessToken,
  });

  const getCredits = async (): Promise<Credits> => {
    const url = `/api/v1/credits?projectId=${cookies.values.projectId}`;

    const response = await backendApi.fetch({
      url,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }

    return response.json();
  };

  const {
    data: credits,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
    refetch: refetchCredits,
  } = useQuery({
    queryKey: ['credits'],
    queryFn: getCredits,
    select: (data) => {
      const balance = (data?.balance ?? 0) / 100;
      const formatted = formatCurrency(balance);
      const positiveBalance = Math.max(balance, 0);

      return {
        balance,
        formatted,
        positiveBalance,
        positiveFormatted: formatCurrency(positiveBalance),
      };
    },
  });

  return {
    credits,
    isCreditsLoading,
    isCreditsError,
    refetchCredits,
  };
};
