import { GetRequestState } from "@app/store/types";
import { useNetInfo } from "@react-native-community/netinfo";


export default function useGetRequestStatus(
  state: GetRequestState,
  showDisconnectViewIfNeed = true,
  showEmptyViewIfNeed = true,
  showErrorViewIfNeed = true,
  showLoadingViewIfNeed = true
) {
  const { data, loaded, loading, error } = state;
  const { isConnected } = useNetInfo();

  const noData = loaded && !data;

  const showDisconnectView = showDisconnectViewIfNeed && !isConnected && noData;
  const showErrorView =
    !showDisconnectView && showErrorViewIfNeed && noData && error;
  const showEmptyView =
    (!showDisconnectView && !showErrorView && showEmptyViewIfNeed && noData) ||
    (loaded && (Array.isArray(data) ? data.length == 0 : false));
  const showLoadingView =
    !showDisconnectView &&
    !showErrorView &&
    !showEmptyView &&
    showLoadingViewIfNeed &&
    !data &&
    loading;

  const showContentView =
    !showDisconnectView &&
    !showErrorView &&
    !showEmptyView &&
    !showLoadingView &&
    !noData;

  return {
    showDisconnectView,
    showErrorView,
    showEmptyView,
    showLoadingView,
    showContentView,
  };
}
