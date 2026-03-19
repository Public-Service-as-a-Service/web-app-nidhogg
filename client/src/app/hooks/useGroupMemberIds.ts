import { API_ENDPOINTS } from "../constants";
import { useDefaultGroups } from "../services/useDefaultGroups";

const managerKey = "managers";
const itProdKey = "it-prod";

export const useGroupMemberIds = (recipientGroups: Record<string, unknown>) => {
  const hasManagersGroup = managerKey in recipientGroups;
  const hasItProdGroup = itProdKey in recipientGroups;

  const { data: managers = [] } = useDefaultGroups({
    queryKey: managerKey,
    endpoint: API_ENDPOINTS.allManagers,
    enabled: hasManagersGroup,
  });

  const { data: itProd = [] } = useDefaultGroups({
    queryKey: itProdKey,
    endpoint: API_ENDPOINTS.itProd,
    enabled: hasItProdGroup,
  });

  return [
    ...(hasManagersGroup ? managers.map((manager) => manager.id) : []),
    ...(hasItProdGroup ? itProd.map((employee) => employee.id) : []),
  ];
};
