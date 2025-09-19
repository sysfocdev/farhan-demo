import { getAllUser } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserStatusBtn } from "./_components/UserStatusBtn";
import { UserDeleteBtn } from "./_components/UserDeleteBtn";
import ErrorToast from "@/components/ErrorToast";

export default async function ManageUsers({
  paramPage,
}: {
  paramPage?: string;
}) {
  const page = parseInt(paramPage || "1", 10);
  const limit = 10;
  const { users, total, error } = await getAllUser(page, limit);

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="flex relative top-[80px] h-full w-[60%]  p-5 overflow-auto">
      <div>{error}</div>
      {error && <ErrorToast message={error} />}
      <div className="m-6 w-full h-[80%] rounded-md bg-white overflow-y-auto p-4">
        <Table>
          <TableCaption>A list of all Users.</TableCaption>
          <TableHeader>
            <TableRow className="uppercase font-bold text-black ">
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Email Address</TableHead>
              <TableCell className="font-bold">Role</TableCell>
              {/* <TableHead className="font-bold">Phone Number</TableHead> */}
              <TableHead className="text-center font-bold">Status</TableHead>

              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="uppercase">{user.role}</TableCell>
                {/* <TableCell>{user.phone}</TableCell> */}
                <TableCell className="text-center">
                  <UserStatusBtn
                    userStatus={user.is_verified}
                    userId={user.id}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <UserDeleteBtn userId={user.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="uppercase font-bold">Total Users</TableCell>
              <TableCell>{total}</TableCell>

              <TableCell colSpan={3} className="text-right">
                {page > 1 && (
                  <Button variant="outline" className="mx-1 w-25">
                    <a href={`?page=${page - 1}`}>Previous</a>
                  </Button>
                )}
                {page < totalPages && (
                  <Button variant="outline" className="mx-1 w-25">
                    <a href={`?page=${page + 1}`}>Next</a>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
