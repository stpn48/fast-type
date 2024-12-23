import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser } from "@/server/queries";
import Link from "next/link";
import { SignoutItem } from "./signout-item";

export async function UserDropdown() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8">
          <AvatarImage src={user.imageUrl || ""} />
          <AvatarFallback>
            {user?.firstName?.charAt(0) ?? "U"}
            {user?.lastName?.charAt(0) ?? "N"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/profile/${user.id}`}>Profile</Link>
        </DropdownMenuItem>
        <SignoutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}