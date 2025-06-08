# Supabase Schema for Salon Platform (Updated)

## clients
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| first_name     | text      |                            |
| last_name      | text      |                            |
| phone          | text      |                            |
| email          | text      |                            |
| created_at     | timestamp |                            |
| notes          | text      |                            |
| pronouns       | text      |                            |
| dob            | date      | Date of birth              |
| ...            | ...       | (add other client fields)  |

---

## team_members
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| first_name     | text      |                            |
| last_name      | text      |                            |
| email          | text      |                            |
| job_title      | text      |                            |
| calendar_color | text      | For calendar UI            |
| phone_number   | text      |                            |
| created_at     | timestamp |                            |
| ...            | ...       | (add other staff fields)   |

---

## services
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| service_id     | text      | 8-char alphanumeric, unique|
| service_name   | text      |                            |
| category       | text      |                            |
| duration       | text      |                            |
| price          | numeric   |                            |
| description    | text      |                            |
| created_at     | timestamp |                            |
| ...            | ...       | (add other service fields) |

---

## products
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| product_name   | text      |                            |
| category       | text      |                            |
| price          | numeric   |                            |
| stock          | integer   |                            |
| ...            | ...       | (add other product fields) |

---

## memberships
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| name           | text      |                            |
| description    | text      |                            |
| price          | numeric   |                            |
| valid_for      | text      | e.g. '1 year'              |
| sessions       | integer   |                            |
| session_type   | text      | 'Limited'/'Unlimited'      |
| ...            | ...       | (add other fields)         |

---

## vouchers
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| name           | text      |                            |
| value          | numeric   |                            |
| services       | text      | e.g. 'All services'        |
| valid_for      | text      | e.g. '1 year'              |
| ...            | ...       | (add other fields)         |

---

## appointments
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| client_id      | uuid      | FK to clients              |
| date           | timestamp |                            |
| status         | text      | scheduled/completed/voided |
| notes          | text      |                            |
| invoice_id     | text      | BranchName000001           |
| created_at     | timestamp |                            |
| ...            | ...       | (add other fields)         |

---

## appointment_services
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| appointment_id | uuid      | FK to appointments         |
| service_id     | uuid      | FK to services             |
| team_member_id | uuid      | FK to team_members         |
| start_time     | time      |                            |
| tip            | numeric   |                            |
| price          | numeric   |                            |
| discount       | numeric   |                            |
| status         | text      | scheduled/completed/voided |
| ...            | ...       | (add other fields)         |

---

## sales
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| invoice_id     | text      | BranchName000001           |
| appointment_id | uuid      | FK to appointments         |
| client_id      | uuid      | FK to clients              |
| payment_type   | text      | Card/Cash/Voucher/etc      |
| total          | numeric   |                            |
| tax            | numeric   |                            |
| discount       | numeric   |                            |
| tip            | numeric   |                            |
| created_at     | timestamp |                            |
| ...            | ...       | (add other fields)         |

---

## sales_services
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| sale_id        | uuid      | FK to sales                |
| service_id     | uuid      | FK to services             |
| team_member_id | uuid      | FK to team_members         |
| tip            | numeric   |                            |
| price          | numeric   |                            |
| discount       | numeric   |                            |
| ...            | ...       | (add other fields)         |

---

## discounts
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| name           | text      |                            |
| type           | text      | 'item'/'cart'              |
| value          | numeric   |                            |
| code           | text      | (for voucher/coupon)       |
| valid_from     | timestamp |                            |
| valid_to       | timestamp |                            |
| ...            | ...       | (add other fields)         |

---

## membership_sales
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| membership_id  | uuid      | FK to memberships          |
| client_id      | uuid      | FK to clients              |
| sale_id        | uuid      | FK to sales                |
| start_date     | timestamp |                            |
| end_date       | timestamp |                            |
| ...            | ...       | (add other fields)         |

---

## voucher_sales
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| voucher_id     | uuid      | FK to vouchers             |
| client_id      | uuid      | FK to clients              |
| sale_id        | uuid      | FK to sales                |
| redeemed       | boolean   |                            |
| redeemed_at    | timestamp |                            |
| ...            | ...       | (add other fields)         |

---

## product_sales
| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | uuid (pk) | Primary key                |
| product_id     | uuid      | FK to products             |
| sale_id        | uuid      | FK to sales                |
| quantity       | integer   |                            |
| price          | numeric   |                            |
| discount       | numeric   |                            |
| ...            | ...       | (add other fields)         |

---

**Relationships:**  
- appointments → clients
- appointment_services → appointments, services, team_members
- sales → appointments, clients
- sales_services → sales, services, team_members
- membership_sales → memberships, clients, sales
- voucher_sales → vouchers, clients, sales
- product_sales → products, sales 

---

**How to use:**  
- Paste this schema into the Supabase SQL editor or Supabase Assistant.
- If you already have these tables, you can use `ALTER TABLE` to add any missing columns.
- Make sure to set up foreign keys and indexes for best performance and data integrity. 