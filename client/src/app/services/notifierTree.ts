import axios from "axios";
import { API_ENDPOINTS } from "@/app/constants";
import { Employee } from "@/app/interfaces/employee";
import { Organization } from "@/app/interfaces/organization";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
const withCredentials = { withCredentials: true };

interface OrganizationResponse {
  organization?: Organization;
}

interface OrganizationsResponse {
  organizations?: Organization[];
  children?: Organization[];
  descendants?: Organization[];
}

interface EmployeesResponse {
  employees?: Employee[];
}

const parseOrganization = (
  data: Organization | OrganizationResponse,
): Organization | null => {
  if ("orgId" in data) return data;
  return data.organization ?? null;
};

const parseOrganizations = (
  data: Organization[] | OrganizationsResponse,
): Organization[] => {
  if (Array.isArray(data)) return data;
  return data.organizations ?? data.children ?? data.descendants ?? [];
};

const parseEmployees = (data: Employee[] | EmployeesResponse): Employee[] => {
  if (Array.isArray(data)) return data;
  return data.employees ?? [];
};

const withOrgIdsParams = (orgIds: string[]) => {
  const query = new URLSearchParams();
  orgIds.forEach((orgId) => query.append("orgIds", orgId));
  return query;
};

export const fetchOrganizationById = async (
  orgId: string,
): Promise<Organization | null> => {
  const response = await axios.get<Organization | OrganizationResponse>(
    `${apiUrl}${API_ENDPOINTS.organizationById(orgId)}`,
    withCredentials,
  );
  return parseOrganization(response.data);
};

export const fetchOrganizationChildren = async (
  orgId: string,
): Promise<Organization[]> => {
  const response = await axios.get<Organization[] | OrganizationsResponse>(
    `${apiUrl}${API_ENDPOINTS.organizationChildrenSimple(orgId)}`,
    withCredentials,
  );
  return parseOrganizations(response.data);
};

export const fetchOrganizationDescendants = async (
  orgId: string,
): Promise<Organization[]> => {
  const response = await axios.get<Organization[] | OrganizationsResponse>(
    `${apiUrl}${API_ENDPOINTS.organizationChildrenDescendants(orgId)}`,
    withCredentials,
  );
  return parseOrganizations(response.data);
};

export const fetchOrganizationsByIds = async (
  orgIds: string[],
): Promise<Organization[]> => {
  const query = withOrgIdsParams(orgIds);
  const response = await axios.get<Organization[] | OrganizationsResponse>(
    `${apiUrl}${API_ENDPOINTS.organizationByIds}?${query.toString()}`,
    withCredentials,
  );
  return parseOrganizations(response.data);
};

export const fetchEmployeesByOrgId = async (
  orgId: string,
): Promise<Employee[]> => {
  const response = await axios.get<Employee[] | EmployeesResponse>(
    `${apiUrl}${API_ENDPOINTS.employeesByOrgId(orgId)}`,
    withCredentials,
  );
  return parseEmployees(response.data);
};

export const fetchEmployeesByOrgIds = async (
  orgIds: string[],
): Promise<Employee[]> => {
  const query = withOrgIdsParams(orgIds);
  const response = await axios.get<Employee[] | EmployeesResponse>(
    `${apiUrl}${API_ENDPOINTS.employeesByOrgIds}?${query.toString()}`,
    withCredentials,
  );
  return parseEmployees(response.data);
};
