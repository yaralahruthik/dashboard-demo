CREATE TABLE IF NOT EXISTS "user_query" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_name" varchar(50),
	"phone_no" varchar(50),
	"user_query_body" text,
	"user_query_mode" varchar(50),
	"user_query_datetime_utc" timestamp,
	"is_query_flag" boolean,
	"ticket_id" varchar(50),
	"query_response_body" text,
	"query_response_datetime_utc" timestamp,
	"pred_assignment" varchar(255),
	"pred_assignment_conf_score" numeric(10, 3),
	"pred_assignment_manual_flag" boolean,
	"pred_priority_manual_flag" boolean,
	"manual_assignment" varchar(255),
	"manual_assignment_datetime_utc" timestamp,
	"manual_priority" varchar(255),
	"manual_priority_datetime_utc" timestamp,
	"ticket_status" varchar(255) DEFAULT 'Open',
	"ticket_status_closed_datetime_utc" timestamp,
	"comments" varchar(1500),
	"executive" varchar(255) DEFAULT 'Unassigned'
);
