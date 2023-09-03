import { Company, company as actual } from "iexcloud_api_wrapper"

const mockCompany: Company = {
  symbol: "",
  CEO: "CEO",
  companyName: "Company Name",
  description: "Description",
  employees: 10,
  exchange: "Exchange",
  industry: "Industry",
  issueType: "Issue Type",
  sector: "Sector",
  securityName: "Security Name",
  tags: ["tag1", "tag2"],
  website: "www.website.com",
}

export const company: typeof actual = (symbol) =>
  Promise.resolve({ ...mockCompany, symbol })
