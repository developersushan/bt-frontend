"use client";

import React, { useState } from "react";
import {
  HiOutlineSearch,
  HiOutlineDotsVertical,
  HiOutlineUserAdd,
  HiOutlineBan,
  HiOutlineCheckCircle,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// demo user data
const initialUsers = [
  {
    id: 1,
    name: "Rahim Uddin",
    email: "rahim@example.com",
    phone: "+8801712345678",
    balance: 1500,
    status: "Active",
    joined: "2024-01-15",
    avatar: "",
  },
  {
    id: 2,
    name: "Karim Ahmed",
    email: "karim@example.com",
    phone: "+8801812345678",
    balance: 850,
    status: "Pending",
    joined: "2024-02-20",
    avatar: "",
  },
  {
    id: 3,
    name: "Sabbir Hossain",
    email: "sabbir@example.com",
    phone: "+8801912345678",
    balance: 3200,
    status: "Active",
    joined: "2024-03-10",
    avatar: "",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "+8801612345678",
    balance: 0,
    status: "Banned",
    joined: "2024-04-05",
    avatar: "",
  },
  {
    id: 5,
    name: "Tanvir Islam",
    email: "tanvir@example.com",
    phone: "+8801512345678",
    balance: 500,
    status: "Active",
    joined: "2024-05-12",
    avatar: "",
  },
  {
    id: 6,
    name: "Mim Akter",
    email: "mim@example.com",
    phone: "+8801312345678",
    balance: 1200,
    status: "Pending",
    joined: "2024-06-18",
    avatar: "",
  },
  {
    id: 7,
    name: "Fahim Rahman",
    email: "fahim@example.com",
    phone: "+8801412345678",
    balance: 2750,
    status: "Active",
    joined: "2024-07-22",
    avatar: "",
  },
  {
    id: 8,
    name: "Sadia Islam",
    email: "sadia@example.com",
    phone: "+8801212345678",
    balance: 100,
    status: "Banned",
    joined: "2024-08-30",
    avatar: "",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // search and filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // status change function
  const handleStatusChange = (userId, newStatus) => {
    setUsers(
      users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)),
    );
  };

  // user delete function
  const handleDeleteUser = (userId: any) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  // status based Badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
            Active
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30">
            Pending
          </Badge>
        );
      case "Banned":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30">
            Banned
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-300 p-4 md:p-2 font-sans">
      <div className="w-full mx-auto space-y-3">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              User Management
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage all registered users, their balances, and statuses.
            </p>
          </div>
          <Dialog>
            <DialogTrigger
              render={
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold" />
              }
            >
              <HiOutlineUserAdd className="mr-2 h-4 w-4" /> Add New User
            </DialogTrigger>
            <DialogContent className="bg-[#111827] border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Enter user details to create a new account.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Full Name"
                  className="bg-[#1F2937] border-gray-700 text-white"
                />
                <Input
                  placeholder="Email"
                  className="bg-[#1F2937] border-gray-700 text-white"
                />
                <Input
                  placeholder="Phone Number"
                  className="bg-[#1F2937] border-gray-700 text-white"
                />
                <Input
                  placeholder="Initial Balance"
                  type="number"
                  className="bg-[#1F2937] border-gray-700 text-white"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  Save User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter Bar */}
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 bg-[#1F2937] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-yellow-500"
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Select
                  value={statusFilter}
                  onValueChange={(val) => {
                    setStatusFilter(val);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-full md:w-[180px] bg-[#1F2937] border-gray-700 text-white">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F2937] border-gray-700 text-white">
                    <SelectItem value="All">All Users</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Banned">Banned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Table */}
        <Card className="bg-[#111827] border-gray-800 overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-gray-800">
            <CardTitle className="text-lg text-white">
              All Users ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#1F2937]">
                  <TableRow className="border-gray-800 hover:bg-[#1F2937]">
                    <TableHead className="text-gray-400 font-medium">
                      User
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Contact
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Balance
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Status
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Joined
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        className="border-gray-800 hover:bg-[#1F2937]/50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-gray-700">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="bg-yellow-500 text-black font-bold text-xs">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-white">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ID: #{user.id.toString().padStart(4, "0")}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-white">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.phone}</p>
                        </TableCell>
                        <TableCell className="font-bold text-green-400">
                          ${user.balance.toLocaleString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-sm text-gray-400">
                          {user.joined}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-[#1F2937]"
                                />
                              }
                            >
                              <HiOutlineDotsVertical className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-[#1F2937] border-gray-700 text-white"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-gray-700" />
                              <DropdownMenuItem className="hover:bg-[#374151] cursor-pointer">
                                <HiOutlinePencil className="mr-2 h-4 w-4" />{" "}
                                Edit User
                              </DropdownMenuItem>
                              {user.status !== "Active" && (
                                <DropdownMenuItem
                                  className="hover:bg-green-500/20 text-green-400 cursor-pointer"
                                  onClick={() =>
                                    handleStatusChange(user.id, "Active")
                                  }
                                >
                                  <HiOutlineCheckCircle className="mr-2 h-4 w-4" />{" "}
                                  Mark as Active
                                </DropdownMenuItem>
                              )}
                              {user.status !== "Banned" && (
                                <DropdownMenuItem
                                  className="hover:bg-yellow-500/20 text-yellow-400 cursor-pointer"
                                  onClick={() =>
                                    handleStatusChange(user.id, "Banned")
                                  }
                                >
                                  <HiOutlineBan className="mr-2 h-4 w-4" /> Ban
                                  User
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator className="bg-gray-700" />
                              <DropdownMenuItem
                                className="hover:bg-red-500/20 text-red-400 cursor-pointer"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <HiOutlineTrash className="mr-2 h-4 w-4" />{" "}
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-12 text-gray-500"
                      >
                        No users found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-800 gap-4">
                <p className="text-sm text-gray-400">
                  Showing{" "}
                  <span className="text-white font-medium">
                    {indexOfFirstUser + 1}
                  </span>{" "}
                  to{" "}
                  <span className="text-white font-medium">
                    {Math.min(indexOfLastUser, filteredUsers.length)}
                  </span>{" "}
                  of{" "}
                  <span className="text-white font-medium">
                    {filteredUsers.length}
                  </span>{" "}
                  users
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
                  >
                    <HiOutlineChevronLeft className="h-4 w-4 mr-1" /> Prev
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 p-0 ${
                            currentPage === page
                              ? "bg-yellow-500 text-black hover:bg-yellow-600"
                              : "border-gray-700 text-gray-300 hover:bg-gray-800"
                          }`}
                        >
                          {page}
                        </Button>
                      ),
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
                  >
                    Next <HiOutlineChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
