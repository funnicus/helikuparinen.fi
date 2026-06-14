import Link from 'next/link';
import { FC } from 'react';

import styles from './breadcrumb.module.css';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
    if (items.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li
                            key={item.href}
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ListItem"
                        >
                            {isLast ? (
                                <span itemProp="name" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <>
                                    <Link href={item.href} itemProp="item">
                                        <span itemProp="name">
                                            {item.label}
                                        </span>
                                    </Link>
                                    <span
                                        className={styles.separator}
                                        aria-hidden="true"
                                    >
                                        ›
                                    </span>
                                </>
                            )}
                            <meta
                                itemProp="position"
                                content={String(index + 1)}
                            />
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
