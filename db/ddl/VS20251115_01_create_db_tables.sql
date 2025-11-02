--
-- PostgreSQL database dump
--

-- Dumped from database version 16.10 (Debian 16.10-1.pgdg13+1)
-- Dumped by pg_dump version 17.0

-- Started on 2025-11-15 18:15:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE myapp_db;
--
-- TOC entry 3634 (class 1262 OID 16384)
-- Name: myapp_db; Type: DATABASE; Schema: -; Owner: myapp
--

CREATE DATABASE myapp_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE myapp_db OWNER TO myapp;

\connect myapp_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16399)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 252 (class 1255 OID 16410)
-- Name: set_updated_at(); Type: FUNCTION; Schema: public; Owner: myapp
--

CREATE FUNCTION public.set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    begin
      new.updated_at = now();
      return new;
    end;
    $$;


ALTER FUNCTION public.set_updated_at() OWNER TO myapp;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 236 (class 1259 OID 16666)
-- Name: book_author_notes; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.book_author_notes (
    book_id bigint NOT NULL,
    author_bio text,
    translator_bio text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.book_author_notes OWNER TO myapp;

--
-- TOC entry 233 (class 1259 OID 16628)
-- Name: book_details; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.book_details (
    book_id bigint NOT NULL,
    subtitle text,
    description text,
    publication_date date,
    pages integer,
    binding text,
    language text,
    original_title text,
    edition text,
    dimensions_mm jsonb,
    weight_g integer,
    sample_pdf_url text,
    preview_url text,
    keywords text[],
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.book_details OWNER TO myapp;

--
-- TOC entry 241 (class 1259 OID 16719)
-- Name: book_images; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.book_images (
    id bigint NOT NULL,
    book_id bigint NOT NULL,
    kind text NOT NULL,
    url text NOT NULL,
    alt text,
    sort integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT book_images_kind_check CHECK ((kind = ANY (ARRAY['COVER'::text, 'GALLERY'::text, 'PREVIEW'::text])))
);


ALTER TABLE public.book_images OWNER TO myapp;

--
-- TOC entry 240 (class 1259 OID 16718)
-- Name: book_images_id_seq; Type: SEQUENCE; Schema: public; Owner: myapp
--

CREATE SEQUENCE public.book_images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_images_id_seq OWNER TO myapp;

--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 240
-- Name: book_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myapp
--

ALTER SEQUENCE public.book_images_id_seq OWNED BY public.book_images.id;


--
-- TOC entry 239 (class 1259 OID 16703)
-- Name: book_review_votes; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.book_review_votes (
    review_id bigint NOT NULL,
    user_id bigint NOT NULL,
    vote_type text DEFAULT 'HELPFUL'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.book_review_votes OWNER TO myapp;

--
-- TOC entry 238 (class 1259 OID 16682)
-- Name: book_reviews; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.book_reviews (
    id bigint NOT NULL,
    book_id bigint NOT NULL,
    user_id bigint,
    user_display text NOT NULL,
    rating smallint NOT NULL,
    title text,
    content text NOT NULL,
    helpful_count integer DEFAULT 0 NOT NULL,
    status text DEFAULT 'VISIBLE'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT book_reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.book_reviews OWNER TO myapp;

--
-- TOC entry 237 (class 1259 OID 16681)
-- Name: book_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: myapp
--

CREATE SEQUENCE public.book_reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_reviews_id_seq OWNER TO myapp;

--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 237
-- Name: book_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myapp
--

ALTER SEQUENCE public.book_reviews_id_seq OWNED BY public.book_reviews.id;


--
-- TOC entry 220 (class 1259 OID 16448)
-- Name: book_stock; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.book_stock (
    book_id bigint NOT NULL,
    qty integer DEFAULT 0 NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.book_stock OWNER TO myapp;

--
-- TOC entry 235 (class 1259 OID 16645)
-- Name: book_toc_items; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.book_toc_items (
    id bigint NOT NULL,
    book_id bigint NOT NULL,
    seq integer NOT NULL,
    depth smallint DEFAULT 0 NOT NULL,
    parent_id bigint,
    title text NOT NULL,
    page_from integer,
    page_to integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.book_toc_items OWNER TO myapp;

--
-- TOC entry 234 (class 1259 OID 16644)
-- Name: book_toc_items_id_seq; Type: SEQUENCE; Schema: public; Owner: myapp
--

CREATE SEQUENCE public.book_toc_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_toc_items_id_seq OWNER TO myapp;

--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 234
-- Name: book_toc_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myapp
--

ALTER SEQUENCE public.book_toc_items_id_seq OWNED BY public.book_toc_items.id;


--
-- TOC entry 219 (class 1259 OID 16428)
-- Name: books; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.books (
    id bigint NOT NULL,
    title text NOT NULL,
    author text NOT NULL,
    translator text,
    price integer NOT NULL,
    image_url text,
    badge text,
    publisher text,
    isbn text,
    status text DEFAULT 'ACTIVE'::text NOT NULL,
    category_id bigint,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.books OWNER TO myapp;

--
-- TOC entry 218 (class 1259 OID 16427)
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: myapp
--

CREATE SEQUENCE public.books_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.books_id_seq OWNER TO myapp;

--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 218
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myapp
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- TOC entry 217 (class 1259 OID 16412)
-- Name: categories; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    parent_id bigint
);


ALTER TABLE public.categories OWNER TO myapp;

--
-- TOC entry 216 (class 1259 OID 16411)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: myapp
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO myapp;

--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 216
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myapp
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 226 (class 1259 OID 16498)
-- Name: order_items; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.order_items (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    book_id bigint NOT NULL,
    title text NOT NULL,
    author text NOT NULL,
    unit_price integer NOT NULL,
    qty integer NOT NULL,
    line_amount integer NOT NULL
);


ALTER TABLE public.order_items OWNER TO myapp;

--
-- TOC entry 225 (class 1259 OID 16497)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: myapp
--

CREATE SEQUENCE public.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO myapp;

--
-- TOC entry 3641 (class 0 OID 0)
-- Dependencies: 225
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myapp
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 224 (class 1259 OID 16475)
-- Name: orders; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.orders (
    id bigint NOT NULL,
    user_id bigint,
    order_uid text NOT NULL,
    status text NOT NULL,
    total_amount integer NOT NULL,
    currency text DEFAULT 'KRW'::text NOT NULL,
    receiver_name text NOT NULL,
    receiver_phone text NOT NULL,
    zip text NOT NULL,
    addr1 text NOT NULL,
    addr2 text,
    requested_at timestamp with time zone DEFAULT now() NOT NULL,
    paid_at timestamp with time zone,
    cancelled_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT chk_orders_status CHECK ((status = ANY (ARRAY['CREATED'::text, 'PENDING_PAYMENT'::text, 'PAID'::text, 'FULFILLING'::text, 'SHIPPED'::text, 'COMPLETED'::text, 'CANCELLED'::text])))
);


ALTER TABLE public.orders OWNER TO myapp;

--
-- TOC entry 223 (class 1259 OID 16474)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: myapp
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO myapp;

--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 223
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myapp
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 232 (class 1259 OID 16553)
-- Name: payment_logs; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.payment_logs (
    id bigint NOT NULL,
    payment_id bigint,
    event text NOT NULL,
    req_json jsonb,
    res_json jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payment_logs OWNER TO myapp;

--
-- TOC entry 231 (class 1259 OID 16552)
-- Name: payment_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: myapp
--

CREATE SEQUENCE public.payment_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_logs_id_seq OWNER TO myapp;

--
-- TOC entry 3643 (class 0 OID 0)
-- Dependencies: 231
-- Name: payment_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myapp
--

ALTER SEQUENCE public.payment_logs_id_seq OWNED BY public.payment_logs.id;


--
-- TOC entry 228 (class 1259 OID 16518)
-- Name: payments; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.payments (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    pg text NOT NULL,
    payment_key text,
    method text,
    status text NOT NULL,
    paid_amount integer DEFAULT 0 NOT NULL,
    requested_at timestamp with time zone DEFAULT now() NOT NULL,
    approved_at timestamp with time zone,
    last_payload_json jsonb
);


ALTER TABLE public.payments OWNER TO myapp;

--
-- TOC entry 227 (class 1259 OID 16517)
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: myapp
--

CREATE SEQUENCE public.payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO myapp;

--
-- TOC entry 3644 (class 0 OID 0)
-- Dependencies: 227
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myapp
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- TOC entry 230 (class 1259 OID 16538)
-- Name: refunds; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.refunds (
    id bigint NOT NULL,
    payment_id bigint NOT NULL,
    amount integer NOT NULL,
    reason text,
    pg_cancel_key text,
    status text NOT NULL,
    requested_at timestamp with time zone DEFAULT now() NOT NULL,
    done_at timestamp with time zone
);


ALTER TABLE public.refunds OWNER TO myapp;

--
-- TOC entry 229 (class 1259 OID 16537)
-- Name: refunds_id_seq; Type: SEQUENCE; Schema: public; Owner: myapp
--

CREATE SEQUENCE public.refunds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refunds_id_seq OWNER TO myapp;

--
-- TOC entry 3645 (class 0 OID 0)
-- Dependencies: 229
-- Name: refunds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myapp
--

ALTER SEQUENCE public.refunds_id_seq OWNED BY public.refunds.id;


--
-- TOC entry 222 (class 1259 OID 16462)
-- Name: users; Type: TABLE; Schema: public; Owner: myapp
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    name text NOT NULL,
    phone text,
    role text DEFAULT 'USER'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO myapp;

--
-- TOC entry 221 (class 1259 OID 16461)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: myapp
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO myapp;

--
-- TOC entry 3646 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myapp
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3382 (class 2604 OID 16722)
-- Name: book_images id; Type: DEFAULT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_images ALTER COLUMN id SET DEFAULT nextval('public.book_images_id_seq'::regclass);


--
-- TOC entry 3375 (class 2604 OID 16685)
-- Name: book_reviews id; Type: DEFAULT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_reviews ALTER COLUMN id SET DEFAULT nextval('public.book_reviews_id_seq'::regclass);


--
-- TOC entry 3370 (class 2604 OID 16648)
-- Name: book_toc_items id; Type: DEFAULT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_toc_items ALTER COLUMN id SET DEFAULT nextval('public.book_toc_items_id_seq'::regclass);


--
-- TOC entry 3346 (class 2604 OID 16431)
-- Name: books id; Type: DEFAULT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- TOC entry 3345 (class 2604 OID 16415)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3360 (class 2604 OID 16501)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 3355 (class 2604 OID 16478)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3366 (class 2604 OID 16556)
-- Name: payment_logs id; Type: DEFAULT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.payment_logs ALTER COLUMN id SET DEFAULT nextval('public.payment_logs_id_seq'::regclass);


--
-- TOC entry 3361 (class 2604 OID 16521)
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- TOC entry 3364 (class 2604 OID 16541)
-- Name: refunds id; Type: DEFAULT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.refunds ALTER COLUMN id SET DEFAULT nextval('public.refunds_id_seq'::regclass);


--
-- TOC entry 3352 (class 2604 OID 16465)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3623 (class 0 OID 16666)
-- Dependencies: 236
-- Data for Name: book_author_notes; Type: TABLE DATA; Schema: public; Owner: myapp
--

INSERT INTO public.book_author_notes VALUES (1, '재레드 다이아몬드에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '강주헌 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (2, '유발 하라리에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '조현욱 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (3, '피터 프랭코판에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '김미선 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (4, '토니 주트에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '박상현 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (5, '윌 듀런트에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '이윤기 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (6, '칼 세이건에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '홍승수 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (7, '스티븐 호킹에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '김동광 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (8, '리처드 도킨스에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '홍영남 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (9, '찰스 다윈에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '김학수 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (10, '브라이언 그린에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '박병철 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (11, '애덤 스미스에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '이석윤 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (12, '토마 피케티에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '유봉호 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (13, '스티븐 레빗에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '안진환 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (14, '대니얼 카너먼에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '이창신 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (15, '토머스 프리드먼에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '이민주 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (16, '마르쿠스 아우렐리우스에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '이재훈 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (17, '빅터 프랭클에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '이시형 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (18, '어니스트 베커에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '이진우 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (19, '데이비드 브룩스에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '홍지수 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_author_notes VALUES (20, '존 스튜어트 밀에 대한 샘플 소개입니다. 실제 소개로 교체해 주세요.', '박홍규 역 역자의 샘플 소개입니다.', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');


--
-- TOC entry 3620 (class 0 OID 16628)
-- Dependencies: 233
-- Data for Name: book_details; Type: TABLE DATA; Schema: public; Owner: myapp
--

INSERT INTO public.book_details VALUES (1, '총, 균, 쇠 : 독서 노트', '총, 균, 쇠은(는) 재레드 다이아몬드의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2023-10-02', 181, 'Paperback', 'ko', NULL, '보급판', '{"d": 17, "h": 190, "w": 130}', 261, NULL, NULL, '{"총,","균,",쇠}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (2, '사피엔스 : 독서 노트', '사피엔스은(는) 유발 하라리의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2022-09-02', 182, 'Paperback', 'ko', NULL, '보급판', '{"d": 18, "h": 192, "w": 132}', 262, NULL, NULL, '{사피엔스}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (3, '실크로드 : 독서 노트', '실크로드은(는) 피터 프랭코판의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2021-08-02', 183, 'Paperback', 'ko', NULL, '보급판', '{"d": 19, "h": 194, "w": 134}', 263, NULL, NULL, '{실크로드}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (4, '포스트워: 1945년 이후의 유럽사 : 독서 노트', '포스트워: 1945년 이후의 유럽사은(는) 토니 주트의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2020-07-02', 184, 'Paperback', 'ko', NULL, '보급판', '{"d": 20, "h": 196, "w": 136}', 264, NULL, NULL, '{포스트워:,1945년,이후의,유럽사}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (5, '역사의 교훈 : 독서 노트', '역사의 교훈은(는) 윌 듀런트의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2019-06-02', 185, 'Paperback', 'ko', NULL, '보급판', '{"d": 21, "h": 198, "w": 138}', 265, NULL, NULL, '{역사의,교훈}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (6, '코스모스 : 독서 노트', '코스모스은(는) 칼 세이건의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2018-05-02', 186, 'Paperback', 'ko', NULL, '보급판', '{"d": 16, "h": 188, "w": 140}', 266, NULL, NULL, '{코스모스}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (7, '시간의 역사 : 독서 노트', '시간의 역사은(는) 스티븐 호킹의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2017-04-02', 187, 'Paperback', 'ko', NULL, '보급판', '{"d": 17, "h": 190, "w": 142}', 267, NULL, NULL, '{시간의,역사}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (8, '이기적 유전자 : 독서 노트', '이기적 유전자은(는) 리처드 도킨스의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2016-03-02', 188, 'Paperback', 'ko', NULL, '보급판', '{"d": 18, "h": 192, "w": 128}', 268, NULL, NULL, '{이기적,유전자}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (9, '종의 기원 : 독서 노트', '종의 기원은(는) 찰스 다윈의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2015-02-02', 189, 'Paperback', 'ko', NULL, '보급판', '{"d": 19, "h": 194, "w": 130}', 269, NULL, NULL, '{종의,기원}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (10, '우주의 구조 : 독서 노트', '우주의 구조은(는) 브라이언 그린의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2014-01-02', 190, 'Paperback', 'ko', NULL, '보급판', '{"d": 20, "h": 196, "w": 132}', 270, NULL, NULL, '{우주의,구조}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (11, '국부론 : 독서 노트', '국부론은(는) 애덤 스미스의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2012-12-02', 191, 'Paperback', 'ko', NULL, '보급판', '{"d": 21, "h": 198, "w": 134}', 271, NULL, NULL, '{국부론}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (12, '21세기 자본 : 독서 노트', '21세기 자본은(는) 토마 피케티의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2012-11-02', 192, 'Paperback', 'ko', NULL, '보급판', '{"d": 16, "h": 188, "w": 136}', 272, NULL, NULL, '{21세기,자본}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (13, '괴짜경제학 : 독서 노트', '괴짜경제학은(는) 스티븐 레빗의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2011-10-02', 193, 'Paperback', 'ko', NULL, '보급판', '{"d": 17, "h": 190, "w": 138}', 273, NULL, NULL, '{괴짜경제학}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (14, '생각에 관한 생각 : 독서 노트', '생각에 관한 생각은(는) 대니얼 카너먼의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2010-09-02', 194, 'Paperback', 'ko', NULL, '보급판', '{"d": 18, "h": 192, "w": 140}', 274, NULL, NULL, '{생각에,관한,생각}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (15, '세계는 평평하다 : 독서 노트', '세계는 평평하다은(는) 토머스 프리드먼의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2009-08-02', 195, 'Paperback', 'ko', NULL, '보급판', '{"d": 19, "h": 194, "w": 142}', 275, NULL, NULL, '{세계는,평평하다}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (16, '명상록 : 독서 노트', '명상록은(는) 마르쿠스 아우렐리우스의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2008-07-02', 196, 'Paperback', 'ko', NULL, '보급판', '{"d": 20, "h": 196, "w": 128}', 276, NULL, NULL, '{명상록}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (17, '죽음의 수용소에서 : 독서 노트', '죽음의 수용소에서은(는) 빅터 프랭클의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2007-06-02', 197, 'Paperback', 'ko', NULL, '보급판', '{"d": 21, "h": 198, "w": 130}', 277, NULL, NULL, '{죽음의,수용소에서}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (18, '죽음의 부정 : 독서 노트', '죽음의 부정은(는) 어니스트 베커의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2006-05-02', 198, 'Paperback', 'ko', NULL, '보급판', '{"d": 16, "h": 188, "w": 132}', 278, NULL, NULL, '{죽음의,부정}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (19, '품격 있는 삶 : 독서 노트', '품격 있는 삶은(는) 데이비드 브룩스의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2005-04-02', 199, 'Paperback', 'ko', NULL, '보급판', '{"d": 17, "h": 190, "w": 134}', 279, NULL, NULL, '{품격,있는,삶}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_details VALUES (20, '자유론 : 독서 노트', '자유론은(는) 존 스튜어트 밀의 저작입니다. 본 항목은 샘플로 자동 생성되었습니다.', '2004-03-02', 200, 'Paperback', 'ko', NULL, '보급판', '{"d": 18, "h": 192, "w": 136}', 280, NULL, NULL, '{자유론}', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');


--
-- TOC entry 3628 (class 0 OID 16719)
-- Dependencies: 241
-- Data for Name: book_images; Type: TABLE DATA; Schema: public; Owner: myapp
--



--
-- TOC entry 3626 (class 0 OID 16703)
-- Dependencies: 239
-- Data for Name: book_review_votes; Type: TABLE DATA; Schema: public; Owner: myapp
--



--
-- TOC entry 3625 (class 0 OID 16682)
-- Dependencies: 238
-- Data for Name: book_reviews; Type: TABLE DATA; Schema: public; Owner: myapp
--

INSERT INTO public.book_reviews VALUES (1, 8, NULL, '최유진', 5, '읽을수록 깊어집니다', '「이기적 유전자」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 8, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (2, 8, NULL, '고독한독자', 1, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 8, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (3, 8, NULL, '책읽는밤', 2, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 3, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (4, 11, NULL, '책읽는밤', 3, '읽을수록 깊어집니다', '「국부론」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 11, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (5, 11, NULL, '이준호', 4, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 2, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (6, 11, NULL, '최유진', 5, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 1, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (7, 19, NULL, '이준호', 1, '읽을수록 깊어집니다', '「품격 있는 삶」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 2, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (8, 19, NULL, '문학애호가', 2, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 1, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (9, 19, NULL, '고독한독자', 3, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 4, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (10, 4, NULL, '고독한독자', 1, '읽을수록 깊어집니다', '「포스트워: 1945년 이후의 유럽사」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 4, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (11, 4, NULL, '박지민', 2, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 4, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (12, 4, NULL, '이준호', 3, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 4, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (13, 14, NULL, '최유진', 1, '읽을수록 깊어집니다', '「생각에 관한 생각」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 14, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (14, 14, NULL, '고독한독자', 2, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 5, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (15, 14, NULL, '책읽는밤', 3, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 4, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (16, 3, NULL, '문학애호가', 5, '읽을수록 깊어집니다', '「실크로드」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 3, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (17, 3, NULL, '책읽는밤', 1, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 3, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (18, 3, NULL, '박지민', 2, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 3, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (19, 17, NULL, '책읽는밤', 4, '읽을수록 깊어집니다', '「죽음의 수용소에서」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 0, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (20, 17, NULL, '이준호', 5, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 8, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (21, 17, NULL, '최유진', 1, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 2, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (22, 20, NULL, '최유진', 2, '읽을수록 깊어집니다', '「자유론」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 3, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (23, 20, NULL, '고독한독자', 3, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 2, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (24, 20, NULL, '책읽는밤', 4, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 0, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (25, 7, NULL, '이준호', 4, '읽을수록 깊어집니다', '「시간의 역사」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 7, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (26, 7, NULL, '문학애호가', 5, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 7, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (27, 7, NULL, '고독한독자', 1, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 2, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (28, 9, NULL, '문학애호가', 1, '읽을수록 깊어집니다', '「종의 기원」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 9, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (29, 9, NULL, '책읽는밤', 2, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 0, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (30, 9, NULL, '박지민', 3, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 4, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (31, 13, NULL, '이준호', 5, '읽을수록 깊어집니다', '「괴짜경제학」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 13, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (32, 13, NULL, '문학애호가', 1, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 4, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (33, 13, NULL, '고독한독자', 2, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 3, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (34, 10, NULL, '고독한독자', 2, '읽을수록 깊어집니다', '「우주의 구조」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 10, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (35, 10, NULL, '박지민', 3, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 1, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (36, 10, NULL, '이준호', 4, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 0, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (37, 1, NULL, '이준호', 3, '읽을수록 깊어집니다', '「총, 균, 쇠」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 1, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (38, 1, NULL, '문학애호가', 4, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 1, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (39, 1, NULL, '고독한독자', 5, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 1, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (40, 5, NULL, '책읽는밤', 2, '읽을수록 깊어집니다', '「역사의 교훈」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 5, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (41, 5, NULL, '이준호', 3, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 5, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (42, 5, NULL, '최유진', 4, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 0, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (43, 18, NULL, '박지민', 5, '읽을수록 깊어집니다', '「죽음의 부정」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 1, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (44, 18, NULL, '최유진', 1, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 0, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (45, 18, NULL, '문학애호가', 2, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 3, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (46, 2, NULL, '최유진', 4, '읽을수록 깊어집니다', '「사피엔스」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 2, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (47, 2, NULL, '고독한독자', 5, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 2, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (48, 2, NULL, '책읽는밤', 1, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 2, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (49, 16, NULL, '고독한독자', 3, '읽을수록 깊어집니다', '「명상록」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 16, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (50, 16, NULL, '박지민', 4, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 7, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (51, 16, NULL, '이준호', 5, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 1, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (52, 15, NULL, '문학애호가', 2, '읽을수록 깊어집니다', '「세계는 평평하다」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 15, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (53, 15, NULL, '책읽는밤', 3, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 6, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (54, 15, NULL, '박지민', 4, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 0, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (55, 6, NULL, '박지민', 3, '읽을수록 깊어집니다', '「코스모스」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 6, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (56, 6, NULL, '최유진', 4, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 6, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (57, 6, NULL, '문학애호가', 5, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 1, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (58, 12, NULL, '박지민', 4, '읽을수록 깊어집니다', '「21세기 자본」 샘플 리뷰입니다. 실제 리뷰로 교체해 주세요.', 12, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (59, 12, NULL, '최유진', 5, '추천합니다', '주제 의식과 전개가 인상적입니다. (샘플)', 3, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_reviews VALUES (60, 12, NULL, '문학애호가', 1, '탄탄한 구성', '번역도 무난하고 리듬감이 좋아요. (샘플)', 2, 'VISIBLE', '2025-11-02 00:45:10.712238+00', '2025-11-02 00:45:10.712238+00');


--
-- TOC entry 3607 (class 0 OID 16448)
-- Dependencies: 220
-- Data for Name: book_stock; Type: TABLE DATA; Schema: public; Owner: myapp
--



--
-- TOC entry 3622 (class 0 OID 16645)
-- Dependencies: 235
-- Data for Name: book_toc_items; Type: TABLE DATA; Schema: public; Owner: myapp
--

INSERT INTO public.book_toc_items VALUES (1, 1, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (2, 2, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (3, 3, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (4, 4, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (5, 5, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (6, 6, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (7, 7, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (8, 8, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (9, 9, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (10, 10, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (11, 11, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (12, 12, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (13, 13, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (14, 14, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (15, 15, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (16, 16, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (17, 17, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (18, 18, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (19, 19, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (20, 20, 1, 0, NULL, '서문', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (21, 1, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (22, 2, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (23, 3, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (24, 4, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (25, 5, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (26, 6, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (27, 7, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (28, 8, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (29, 9, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (30, 10, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (31, 11, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (32, 12, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (33, 13, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (34, 14, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (35, 15, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (36, 16, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (37, 17, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (38, 18, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (39, 19, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (40, 20, 2, 0, NULL, '1장', 1, 30, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (41, 1, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (42, 2, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (43, 3, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (44, 4, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (45, 5, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (46, 6, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (47, 7, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (48, 8, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (49, 9, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (50, 10, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (51, 11, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (52, 12, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (53, 13, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (54, 14, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (55, 15, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (56, 16, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (57, 17, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (58, 18, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (59, 19, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (60, 20, 3, 0, NULL, '2장', 31, 90, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (61, 1, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (62, 2, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (63, 3, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (64, 4, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (65, 5, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (66, 6, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (67, 7, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (68, 8, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (69, 9, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (70, 10, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (71, 11, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (72, 12, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (73, 13, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (74, 14, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (75, 15, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (76, 16, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (77, 17, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (78, 18, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (79, 19, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (80, 20, 4, 0, NULL, '3장', 91, 160, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (81, 1, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (82, 2, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (83, 3, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (84, 4, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (85, 5, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (86, 6, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (87, 7, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (88, 8, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (89, 9, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (90, 10, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (91, 11, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (92, 12, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (93, 13, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (94, 14, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (95, 15, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (96, 16, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (97, 17, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (98, 18, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (99, 19, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');
INSERT INTO public.book_toc_items VALUES (100, 20, 5, 0, NULL, '해설', NULL, NULL, '2025-11-02 00:45:10.712238+00');


--
-- TOC entry 3606 (class 0 OID 16428)
-- Dependencies: 219
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: myapp
--

INSERT INTO public.books VALUES (1, '총, 균, 쇠', '재레드 다이아몬드', '강주헌 역', 24000, 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=600&h=900', 'CLASSIC', '문학사상사', '9788970127248', 'ACTIVE', 1, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (2, '사피엔스', '유발 하라리', '조현욱 역', 22000, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=900', 'BESTSELLER', '김영사', '9788934972464', 'ACTIVE', 1, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (3, '실크로드', '피터 프랭코판', '김미선 역', 21000, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=900', 'ESSENTIAL', '사이언스북스', '9788901229210', 'ACTIVE', 1, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (4, '포스트워: 1945년 이후의 유럽사', '토니 주트', '박상현 역', 35000, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=900', NULL, '플래닛미디어', '9788932921656', 'ACTIVE', 1, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (5, '역사의 교훈', '윌 듀런트', '이윤기 역', 16000, 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=900', NULL, '범우사', '9788931010283', 'ACTIVE', 1, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (6, '코스모스', '칼 세이건', '홍승수 역', 23000, 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=900', 'CLASSIC', '사이언스북스', '9788983711892', 'ACTIVE', 2, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (7, '시간의 역사', '스티븐 호킹', '김동광 역', 19000, 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&h=900', 'ESSENTIAL', '까치', '9788972915811', 'ACTIVE', 2, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (8, '이기적 유전자', '리처드 도킨스', '홍영남 역', 21000, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=900', 'BESTSELLER', '을유문화사', '9788932473901', 'ACTIVE', 2, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (9, '종의 기원', '찰스 다윈', '김학수 역', 25000, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=900', 'CLASSIC', '동서문화사', '9788925551609', 'ACTIVE', 2, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (10, '우주의 구조', '브라이언 그린', '박병철 역', 26000, 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=900', 'MODERN', '승산', '9788985047845', 'ACTIVE', 2, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (11, '국부론', '애덤 스미스', '이석윤 역', 28000, 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&h=900', 'CLASSIC', '범우사', '9788931001198', 'ACTIVE', 3, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (12, '21세기 자본', '토마 피케티', '유봉호 역', 39000, 'https://images.unsplash.com/photo-1528208079125-0f43f0bb1ee0?w=600&h=900', 'ESSENTIAL', '글항아리', '9788967350687', 'ACTIVE', 3, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (13, '괴짜경제학', '스티븐 레빗', '안진환 역', 18000, 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&h=900', 'BESTSELLER', '웅진지식하우스', '9788901093156', 'ACTIVE', 3, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (14, '생각에 관한 생각', '대니얼 카너먼', '이창신 역', 22000, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=900', 'BESTSELLER', '김영사', '9788934973669', 'ACTIVE', 3, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (15, '세계는 평평하다', '토머스 프리드먼', '이민주 역', 24000, 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=900', 'MODERN', '21세기북스', '9788950912007', 'ACTIVE', 3, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (16, '명상록', '마르쿠스 아우렐리우스', '이재훈 역', 15000, 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=900', 'CLASSIC', '현암사', '9788932311456', 'ACTIVE', 4, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (17, '죽음의 수용소에서', '빅터 프랭클', '이시형 역', 14000, 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=900', 'ESSENTIAL', '청아출판사', '9788936810849', 'ACTIVE', 4, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (18, '죽음의 부정', '어니스트 베커', '이진우 역', 20000, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=900', 'CLASSIC', '을유문화사', '9788932472454', 'ACTIVE', 4, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (19, '품격 있는 삶', '데이비드 브룩스', '홍지수 역', 18000, 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=900', 'MODERN', '한국경제신문사', '9788947540131', 'ACTIVE', 4, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');
INSERT INTO public.books VALUES (20, '자유론', '존 스튜어트 밀', '박홍규 역', 16000, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=900', 'CLASSIC', '사회평론', '9788964353049', 'ACTIVE', 4, '2025-11-02 00:05:42.579642+00', '2025-11-02 00:05:42.579642+00');


--
-- TOC entry 3604 (class 0 OID 16412)
-- Dependencies: 217
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: myapp
--

INSERT INTO public.categories VALUES (1, 'history', '역사', NULL);
INSERT INTO public.categories VALUES (2, 'science', '과학', NULL);
INSERT INTO public.categories VALUES (3, 'economy', '경제', NULL);
INSERT INTO public.categories VALUES (4, 'humanity', '인문', NULL);


--
-- TOC entry 3613 (class 0 OID 16498)
-- Dependencies: 226
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: myapp
--



--
-- TOC entry 3611 (class 0 OID 16475)
-- Dependencies: 224
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: myapp
--



--
-- TOC entry 3619 (class 0 OID 16553)
-- Dependencies: 232
-- Data for Name: payment_logs; Type: TABLE DATA; Schema: public; Owner: myapp
--



--
-- TOC entry 3615 (class 0 OID 16518)
-- Dependencies: 228
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: myapp
--



--
-- TOC entry 3617 (class 0 OID 16538)
-- Dependencies: 230
-- Data for Name: refunds; Type: TABLE DATA; Schema: public; Owner: myapp
--



--
-- TOC entry 3609 (class 0 OID 16462)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: myapp
--



--
-- TOC entry 3647 (class 0 OID 0)
-- Dependencies: 240
-- Name: book_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myapp
--

SELECT pg_catalog.setval('public.book_images_id_seq', 1, false);


--
-- TOC entry 3648 (class 0 OID 0)
-- Dependencies: 237
-- Name: book_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myapp
--

SELECT pg_catalog.setval('public.book_reviews_id_seq', 60, true);


--
-- TOC entry 3649 (class 0 OID 0)
-- Dependencies: 234
-- Name: book_toc_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myapp
--

SELECT pg_catalog.setval('public.book_toc_items_id_seq', 100, true);


--
-- TOC entry 3650 (class 0 OID 0)
-- Dependencies: 218
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myapp
--

SELECT pg_catalog.setval('public.books_id_seq', 20, true);


--
-- TOC entry 3651 (class 0 OID 0)
-- Dependencies: 216
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myapp
--

SELECT pg_catalog.setval('public.categories_id_seq', 4, true);


--
-- TOC entry 3652 (class 0 OID 0)
-- Dependencies: 225
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myapp
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- TOC entry 3653 (class 0 OID 0)
-- Dependencies: 223
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myapp
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- TOC entry 3654 (class 0 OID 0)
-- Dependencies: 231
-- Name: payment_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myapp
--

SELECT pg_catalog.setval('public.payment_logs_id_seq', 1, false);


--
-- TOC entry 3655 (class 0 OID 0)
-- Dependencies: 227
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myapp
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- TOC entry 3656 (class 0 OID 0)
-- Dependencies: 229
-- Name: refunds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myapp
--

SELECT pg_catalog.setval('public.refunds_id_seq', 1, false);


--
-- TOC entry 3657 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myapp
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 3428 (class 2606 OID 16674)
-- Name: book_author_notes book_author_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_author_notes
    ADD CONSTRAINT book_author_notes_pkey PRIMARY KEY (book_id);


--
-- TOC entry 3422 (class 2606 OID 16636)
-- Name: book_details book_details_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_details
    ADD CONSTRAINT book_details_pkey PRIMARY KEY (book_id);


--
-- TOC entry 3436 (class 2606 OID 16729)
-- Name: book_images book_images_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_images
    ADD CONSTRAINT book_images_pkey PRIMARY KEY (id);


--
-- TOC entry 3434 (class 2606 OID 16711)
-- Name: book_review_votes book_review_votes_pk; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_review_votes
    ADD CONSTRAINT book_review_votes_pk PRIMARY KEY (review_id, user_id);


--
-- TOC entry 3430 (class 2606 OID 16694)
-- Name: book_reviews book_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_reviews
    ADD CONSTRAINT book_reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 3398 (class 2606 OID 16454)
-- Name: book_stock book_stock_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_stock
    ADD CONSTRAINT book_stock_pkey PRIMARY KEY (book_id);


--
-- TOC entry 3425 (class 2606 OID 16654)
-- Name: book_toc_items book_toc_items_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_toc_items
    ADD CONSTRAINT book_toc_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3393 (class 2606 OID 16438)
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- TOC entry 3389 (class 2606 OID 16421)
-- Name: categories categories_code_key; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_code_key UNIQUE (code);


--
-- TOC entry 3391 (class 2606 OID 16419)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3410 (class 2606 OID 16505)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3405 (class 2606 OID 16489)
-- Name: orders orders_order_uid_key; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_order_uid_key UNIQUE (order_uid);


--
-- TOC entry 3407 (class 2606 OID 16487)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3420 (class 2606 OID 16561)
-- Name: payment_logs payment_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.payment_logs
    ADD CONSTRAINT payment_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 3412 (class 2606 OID 16529)
-- Name: payments payments_order_id_key; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_key UNIQUE (order_id);


--
-- TOC entry 3414 (class 2606 OID 16531)
-- Name: payments payments_payment_key_key; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_payment_key_key UNIQUE (payment_key);


--
-- TOC entry 3416 (class 2606 OID 16527)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 3418 (class 2606 OID 16546)
-- Name: refunds refunds_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.refunds
    ADD CONSTRAINT refunds_pkey PRIMARY KEY (id);


--
-- TOC entry 3400 (class 2606 OID 16473)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3402 (class 2606 OID 16471)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3423 (class 1259 OID 16642)
-- Name: idx_book_details_keywords; Type: INDEX; Schema: public; Owner: myapp
--

CREATE INDEX idx_book_details_keywords ON public.book_details USING gin (keywords);


--
-- TOC entry 3437 (class 1259 OID 16735)
-- Name: idx_book_images_book_sort; Type: INDEX; Schema: public; Owner: myapp
--

CREATE INDEX idx_book_images_book_sort ON public.book_images USING btree (book_id, sort);


--
-- TOC entry 3431 (class 1259 OID 16700)
-- Name: idx_book_reviews_book_created; Type: INDEX; Schema: public; Owner: myapp
--

CREATE INDEX idx_book_reviews_book_created ON public.book_reviews USING btree (book_id, created_at DESC);


--
-- TOC entry 3432 (class 1259 OID 16701)
-- Name: idx_book_reviews_book_rating; Type: INDEX; Schema: public; Owner: myapp
--

CREATE INDEX idx_book_reviews_book_rating ON public.book_reviews USING btree (book_id, rating DESC);


--
-- TOC entry 3426 (class 1259 OID 16665)
-- Name: idx_book_toc_items_book_seq; Type: INDEX; Schema: public; Owner: myapp
--

CREATE INDEX idx_book_toc_items_book_seq ON public.book_toc_items USING btree (book_id, seq);


--
-- TOC entry 3394 (class 1259 OID 16446)
-- Name: idx_books_author_gin; Type: INDEX; Schema: public; Owner: myapp
--

CREATE INDEX idx_books_author_gin ON public.books USING gin (to_tsvector('simple'::regconfig, author));


--
-- TOC entry 3395 (class 1259 OID 16444)
-- Name: idx_books_category_status; Type: INDEX; Schema: public; Owner: myapp
--

CREATE INDEX idx_books_category_status ON public.books USING btree (category_id, status);


--
-- TOC entry 3396 (class 1259 OID 16445)
-- Name: idx_books_title_gin; Type: INDEX; Schema: public; Owner: myapp
--

CREATE INDEX idx_books_title_gin ON public.books USING gin (to_tsvector('simple'::regconfig, title));


--
-- TOC entry 3408 (class 1259 OID 16516)
-- Name: idx_order_items_order; Type: INDEX; Schema: public; Owner: myapp
--

CREATE INDEX idx_order_items_order ON public.order_items USING btree (order_id);


--
-- TOC entry 3403 (class 1259 OID 16495)
-- Name: idx_orders_user_created; Type: INDEX; Schema: public; Owner: myapp
--

CREATE INDEX idx_orders_user_created ON public.orders USING btree (user_id, created_at DESC);


--
-- TOC entry 3458 (class 2620 OID 16680)
-- Name: book_author_notes trg_book_author_notes_updated_at; Type: TRIGGER; Schema: public; Owner: myapp
--

CREATE TRIGGER trg_book_author_notes_updated_at BEFORE UPDATE ON public.book_author_notes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 3457 (class 2620 OID 16643)
-- Name: book_details trg_book_details_updated_at; Type: TRIGGER; Schema: public; Owner: myapp
--

CREATE TRIGGER trg_book_details_updated_at BEFORE UPDATE ON public.book_details FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 3459 (class 2620 OID 16702)
-- Name: book_reviews trg_book_reviews_updated_at; Type: TRIGGER; Schema: public; Owner: myapp
--

CREATE TRIGGER trg_book_reviews_updated_at BEFORE UPDATE ON public.book_reviews FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 3455 (class 2620 OID 16577)
-- Name: book_stock trg_book_stock_updated_at; Type: TRIGGER; Schema: public; Owner: myapp
--

CREATE TRIGGER trg_book_stock_updated_at BEFORE UPDATE ON public.book_stock FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 3454 (class 2620 OID 16576)
-- Name: books trg_books_updated_at; Type: TRIGGER; Schema: public; Owner: myapp
--

CREATE TRIGGER trg_books_updated_at BEFORE UPDATE ON public.books FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 3456 (class 2620 OID 16578)
-- Name: orders trg_orders_updated_at; Type: TRIGGER; Schema: public; Owner: myapp
--

CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 3450 (class 2606 OID 16675)
-- Name: book_author_notes book_author_notes_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_author_notes
    ADD CONSTRAINT book_author_notes_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- TOC entry 3447 (class 2606 OID 16637)
-- Name: book_details book_details_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_details
    ADD CONSTRAINT book_details_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- TOC entry 3453 (class 2606 OID 16730)
-- Name: book_images book_images_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_images
    ADD CONSTRAINT book_images_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- TOC entry 3452 (class 2606 OID 16712)
-- Name: book_review_votes book_review_votes_review_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_review_votes
    ADD CONSTRAINT book_review_votes_review_id_fkey FOREIGN KEY (review_id) REFERENCES public.book_reviews(id) ON DELETE CASCADE;


--
-- TOC entry 3451 (class 2606 OID 16695)
-- Name: book_reviews book_reviews_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_reviews
    ADD CONSTRAINT book_reviews_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- TOC entry 3440 (class 2606 OID 16455)
-- Name: book_stock book_stock_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_stock
    ADD CONSTRAINT book_stock_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- TOC entry 3448 (class 2606 OID 16655)
-- Name: book_toc_items book_toc_items_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_toc_items
    ADD CONSTRAINT book_toc_items_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- TOC entry 3449 (class 2606 OID 16660)
-- Name: book_toc_items book_toc_items_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.book_toc_items
    ADD CONSTRAINT book_toc_items_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.book_toc_items(id) ON DELETE CASCADE;


--
-- TOC entry 3439 (class 2606 OID 16439)
-- Name: books books_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- TOC entry 3438 (class 2606 OID 16623)
-- Name: categories categories_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 3442 (class 2606 OID 16511)
-- Name: order_items order_items_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- TOC entry 3443 (class 2606 OID 16506)
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- TOC entry 3441 (class 2606 OID 16490)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3446 (class 2606 OID 16562)
-- Name: payment_logs payment_logs_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.payment_logs
    ADD CONSTRAINT payment_logs_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payments(id);


--
-- TOC entry 3444 (class 2606 OID 16532)
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- TOC entry 3445 (class 2606 OID 16547)
-- Name: refunds refunds_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myapp
--

ALTER TABLE ONLY public.refunds
    ADD CONSTRAINT refunds_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payments(id) ON DELETE CASCADE;


-- Completed on 2025-11-15 18:15:41

--
-- PostgreSQL database dump complete
--

