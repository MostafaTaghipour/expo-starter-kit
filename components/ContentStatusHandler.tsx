import { useGetRequestStatus } from "@app/hooks";
import { GetRequestState } from "@app/store/types";
import React, { PropsWithChildren } from "react";
import DisconnectView from "./DisconnectView";
import EmptyView from "./EmptyView";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";

export type ContentStatusHandlerProps = {
  state: GetRequestState;
  showDisconnectViewIfNeed: boolean;
  showEmptyViewIfNeed: boolean;
  showErrorViewIfNeed: boolean;
  showLoadingViewIfNeed: boolean;
  onRetry?: () => any;
  emptyViewIcon?: React.ReactNode;
  emptyViewSubtitle?: string;
  emptyViewTitle?: string;
  disconnectViewIcon?: React.ReactNode;
  disconnectViewTitle?: string;
  disconnectViewSubtitle?: string;
  errorViewIcon?: React.ReactNode;
  errorViewTitle?: string;
  errorViewSubtitle?: string;
};
export default function ContentStatusHandler(
  props: PropsWithChildren<ContentStatusHandlerProps>
) {
  const {
    state,
    showDisconnectViewIfNeed,
    showEmptyViewIfNeed,
    showErrorViewIfNeed,
    showLoadingViewIfNeed,
    children,
    onRetry,
    emptyViewIcon,
    emptyViewTitle,
    emptyViewSubtitle,
    disconnectViewIcon,
    disconnectViewTitle,
    disconnectViewSubtitle,
    errorViewIcon,
    errorViewTitle,
    errorViewSubtitle,
  } = props;
  const status = useGetRequestStatus(
    state,
    showDisconnectViewIfNeed,
    showEmptyViewIfNeed,
    showErrorViewIfNeed,
    showLoadingViewIfNeed
  );

  return (
    <>
      {status.showDisconnectView && (
        <DisconnectView
          onRetry={onRetry}
          icon={disconnectViewIcon}
          title={disconnectViewTitle}
          subtitle={disconnectViewSubtitle}
        />
      )}
      {status.showErrorView && (
        <ErrorView
          subtitle={errorViewSubtitle || state.error?.userMessage}
          onRetry={onRetry}
          icon={errorViewIcon}
          title={errorViewTitle}
        />
      )}
      {status.showLoadingView && <LoadingView />}
      {status.showEmptyView && (
        <EmptyView
          icon={emptyViewIcon}
          title={emptyViewTitle}
          subtitle={emptyViewSubtitle}
        />
      )}
      {status.showContentView && children}
    </>
  );
}

ContentStatusHandler.defaultProps = {
  showDisconnectViewIfNeed: true,
  showEmptyViewIfNeed: true,
  showErrorViewIfNeed: true,
  showLoadingViewIfNeed: true,
};
