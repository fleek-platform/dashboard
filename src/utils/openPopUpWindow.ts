export type OpenPopUpWindowArgs = {
  url: string;
  width?: number;
  height?: number;
  onClose?: () => void;
};

export const openPopUpWindow = ({
  url,
  width = 500,
  height = 800,
  onClose,
}: OpenPopUpWindowArgs) => {
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;

  const popUp = window.open(
    url,
    'Authentication',
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`,
  );

  if (popUp && onClose) {
    const interval = setInterval(() => {
      if (popUp.closed) {
        onClose();
        clearInterval(interval);
      }
    }, 1000);
  }

  return popUp;
};
