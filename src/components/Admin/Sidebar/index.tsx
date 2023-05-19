import { Logo } from 'components/Logo';
import { Tooltip } from 'components/Tooltip';
import { Component2Icon, ExitIcon, PlusIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';
import Link from 'next/link';
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { useLang } from 'hooks/use-lang';

export const SidebarLink = ({
  tooltipContent,
  className,
  children,
  href,
  asChild,
}: {
  asChild?: boolean;
  tooltipContent: string;
  className?: string;
  href?: string;
} & BTypes.FCChildren) => {
  const Comp = asChild ? Slot : Link;

  return (
    <Tooltip content={tooltipContent}>
      <Comp href={href || ''}>
        <div
          className={`bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block ${className}`}
        >
          {children}
        </div>
      </Comp>
    </Tooltip>
  );
};

export const Sidebar = () => {
  const router = useRouter();
  const { lang } = useLang();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <div className="w-20 h-screen sticky top-0 p-4 bg-white border-r-[1px] flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <Tooltip content="Go to Homepage">
          <Link href="/">
            <div className="bg-primary p-3 rounded-lg inline-block">
              <Logo logoOnly logoSize="big" />
            </div>
          </Link>
        </Tooltip>
        <span className="border-b-[1px] border-gray-200 w-full p-2" />
        <SidebarLink className="mt-4" href="/admin/dash" tooltipContent="Go to Dash">
          <Component2Icon className="w-5 h-5" />
        </SidebarLink>
        <SidebarLink href="/admin/dash/product/create" tooltipContent="Add Product">
          <PlusIcon className="w-5 h-5" />
        </SidebarLink>
      </div>
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => {
            supabaseClient.auth.signOut().then(() => {
              window.location.pathname = '/';
            });
          }}
        >
          <SidebarLink asChild className="h-fit flex" tooltipContent="Sing out">
            <ExitIcon className="w-5 h-5" />
          </SidebarLink>
        </button>
      </div>
    </div>
  );
};
