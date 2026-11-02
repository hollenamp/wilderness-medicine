import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    admin: boolean;
    profile: {
        phone: string;
        extension: string;
        job_title: string;
    };
    email_verified_at?: string;
}

export interface Users {
    id: number;
    name: string;
    email: string;
    admin: boolean;
    profile: {
        phone: string;
        extension: string;
        job_title: string;
    };
    suspended: boolean;
}

export interface BusinessInfo {
    id: number;
    business_name: string;
    business_phone: string | null;
    business_phone_two: string | null;
    business_sms: string | null;
    business_sms_two: string | null;
    business_email: string | null;
    business_address: string | null;
    business_hours: string | null;
    tagline: string | null;
    logo_path: string | null;
    facebook_url: string | null;
    instagram_url: string | null;
    twitter_url: string | null;
    linkedin_url: string | null;
    created_at: string;
    updated_at: string;
}

export type ClassNavItem = {
    title: string;
    href: string;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        success?: string;
        error?: string;
        statusUnchanged?: boolean;
    };
    businessInfo: BusinessInfo;
    mailLogCount: number | null;
    classNavItems?: ClassNavItem[];
    ziggy: Config & { location: string };
};

export type DashboardPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    profile: User;
    users: [Users];
    ziggy: Config & { location: string };
};

export type UserPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    user: User;
    users: [Users];
    ziggy: Config & { location: string };
};

export interface DashboardStats {
    pages: {
        total: number;
        visible: number;
    };
    media: {
        total: number;
        size: number;
    };
    galleries: {
        total: number;
    };
    users: {
        total: number;
    } | null;
}

export interface DashboardRecentPage {
    id: number;
    title: string;
    route_name: string;
    is_visible: boolean;
    updated_at: string;
}

export type AdminDashboardPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    stats: DashboardStats;
    recentPages: DashboardRecentPage[];
    recentMedia: Media[];
    ziggy: Config & { location: string };
};

export interface PageSeo {
    meta_title: string | null;
    meta_description: string | null;
    og_title: string | null;
    og_description: string | null;
    og_image: string | null;
    canonical_url: string | null;
    robots: string | null;
    structured_data: string | null;
}

export interface Page extends PageSeo {
    id: number;
    route_name: string;
    title: string;
    is_visible: boolean;
    content: Record<string, unknown> | null;
    component: string;
    created_at: string;
    updated_at: string;
}

export type PageListPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        pages: Page[];
    };

export type PageEditPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        page: Page;
    };

export type PageSettingsPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        pages: Page[];
    };

export interface Media {
    id: number;
    uuid: string;
    filename: string;
    original_name: string;
    mime_type: string;
    extension: string;
    size: number;
    path: string;
    disk: string;
    alt_text: string | null;
    url: string;
    created_at: string;
    updated_at: string;
    categories?: Category[];
    pivot?: {
        sort_order: number;
        title: string | null;
        description: string | null;
    };
}

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    media_count?: number;
    galleries?: Pick<Gallery, 'id' | 'name'>[];
}

export interface Gallery {
    id: number;
    name: string;
    description: string | null;
    media_count?: number;
    media?: Media[];
    created_at: string;
    updated_at: string;
}

export type GalleryListPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        galleries: Gallery[];
    };

export type GalleryEditPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        gallery: Gallery | null;
    };

export type ImageCategoryListPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        categories: Category[];
    };

export type ImageCategoryEditPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        category: Category | null;
    };

export type MediaListPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        media: Paginated<Media>;
    };

export interface BlogCategory {
    id: number;
    name: string;
    slug: string;
}

export interface BlogPost extends PageSeo {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    featured_image_id: number | null;
    featured_image?: Media | null;
    status: 'draft' | 'published';
    published_at: string | null;
    user_id: number | null;
    author?: Pick<User, 'id' | 'name'> | null;
    categories?: BlogCategory[];
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

export type BlogPostListPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        posts: BlogPost[];
    };

export type BlogPostEditPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        post: BlogPost | null;
        categories: BlogCategory[];
        authors: Pick<User, 'id' | 'name'>[];
    };

export interface Redirect {
    id: number;
    from_path: string;
    to_path: string;
    status_code: 301 | 302;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export type RedirectListPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        redirects: Redirect[];
    };

export type RedirectEditPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        redirect: Redirect | null;
    };

export interface Course extends PageSeo {
    id: number;
    title: string;
    slug: string;
    nav_label: string | null;
    excerpt: string | null;
    content: string | null;
    featured_image_id: number | null;
    featured_image?: Media | null;
    status: 'draft' | 'published';
    published_at: string | null;
    sort_order: number;
    original_url?: string | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

export type CourseListPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        courses: Course[];
    };

export type CourseEditPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        course: Course | null;
    };

export type ClassIndexPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    courses: Paginated<Course>;
    siteConfig: Record<string, unknown>;
};

export type ClassShowPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    course: Course;
    siteConfig: Record<string, unknown>;
    seo: PageSeo;
};

export type BlogIndexPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    posts: Paginated<BlogPost>;
    siteConfig: Record<string, unknown>;
};

export type BlogShowPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    post: BlogPost;
    siteConfig: Record<string, unknown>;
    seo: PageSeo;
};

export interface ProductVariant {
    label: string;
    price?: number | string | null;
}

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    sort_order: number;
    products_count?: number;
}

export interface Product extends PageSeo {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    author: string | null;
    content: string | null;
    price: string | number | null;
    featured_image_id: number | null;
    featured_image?: Media | null;
    status: 'draft' | 'published';
    published_at: string | null;
    variants: ProductVariant[] | null;
    categories?: ProductCategory[];
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

export type ProductListPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        products: Product[];
    };

export type ProductEditPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        product: Product | null;
        categories: ProductCategory[];
    };

export type ProductCategoryListPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        categories: ProductCategory[];
    };

export type ProductCategoryEditPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        category: ProductCategory | null;
    };

export type StoreIndexPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    categories: ProductCategory[];
    siteConfig: Record<string, unknown>;
};

export type StoreCategoryPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    category: ProductCategory;
    products: Paginated<Product>;
    siteConfig: Record<string, unknown>;
};

export type StoreProductPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    product: Product;
    siteConfig: Record<string, unknown>;
    seo: PageSeo;
};

export interface Menu {
    id: number;
    name: string;
    location: string | null;
    is_customized: boolean;
    created_at: string;
    updated_at: string;
}

export interface MenuItem {
    id: number;
    menu_id: number;
    parent_id: number | null;
    type: string;
    url: string;
    label: string;
    sort_order: number;
}

export type DraftMenuItem = {
    id: number | string;
    label: string;
    url: string;
    parent_id: number | string | null;
    sort_order: number;
};

export interface MenuPageOption {
    id: number;
    title: string;
    url: string;
}

export type MenusPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        selectedLocation: string | null;
        selectedMenu: Menu | null;
        menuItems: MenuItem[];
        pages: MenuPageOption[];
    };

export type BusinessSettingsPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        businessInfo: BusinessInfo;
    };

export interface MailLog {
    id: number;
    to: string;
    subject: string;
    body: string | null;
    from: string | null;
    created_at: string;
    updated_at: string;
}

export interface MailLogSetting {
    id: number;
    enabled: boolean;
    created_at: string;
    updated_at: string;
}

export type MailLogListPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        mailLogs: Paginated<MailLog>;
    };

export type MailLogShowPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        mail: MailLog;
        previousId: number | null;
        nextId: number | null;
    };

export type MailLogSettingsPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T &
    PageProps & {
        mailLogSettings: MailLogSetting;
    };
