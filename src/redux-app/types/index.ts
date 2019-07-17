export interface IApiUsersResponse {
    users: {
        id: number;
        first_name: string;
        last_name: string;
        email_address: string;
        company_name: string;
        image_url: string;
    }[];
}

export interface IApiObservationsResponse {
    observations: {
        fiscal_year: string;
        fiscal_month_name: string;
        department_name: string;
        revenue_source_name: string;
        revenue_collected: string;
        fund_name: string;
        revenue_source_class_name: string;
        revenue_source_category_name: string;
        revenue_source_category: string;
        fiscal_month: string;
        fiscal_period: string;
        fund: string;
        department: string;
        revenue_source_class: string;
        revenue_source: string;
    };
}

export interface IObservation {}

export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    email_address: string;
    company_name: string;
    image_url: string;
}
