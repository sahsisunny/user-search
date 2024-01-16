"use client";
import { useEffect, useRef, useState } from 'react';

import UserItem from '@/components/UserItem';
import { UserSuggestionsItems } from '@/components/UserSuggestionsItems';

import { userData } from '../data/userData';

type UserType = {
  name: string;
  image: string;
};

export default function Home() {
  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState(userData);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
    const filteredUsers = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) &&
        !selectedUsers.some((selectedUser) => selectedUser.name === user.name)
    );
    setUsers(filteredUsers);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showSuggestions &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showSuggestions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !searchName && selectedUsers.length > 0) {
      setSelectedUsers((prev) => prev.slice(0, prev.length - 1));
    }
    if (e.key === "Enter" && showSuggestions) {
      setSelectedUsers((prev) => [...prev, users[0]]);
      setUsers((prev) => prev.filter((u) => u.name !== users[0].name));
      setSearchName("");
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();

      if (showSuggestions) {
        const currentIndex = users.findIndex((user) => user.name === searchName);
        const nextIndex =
          e.key === "ArrowDown" ? (currentIndex + 1) % users.length : (currentIndex - 1 + users.length) % users.length;

        setSearchName(users[nextIndex].name);
        setSelectedSuggestionIndex(nextIndex);
      }
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center pt-20 p-4 gap-4 border">
      <h1 className="text-3xl font-bold items-center w-[full]">Pick User</h1>
      <div className="flex flex-col justify-center gap-4 w-[80%]">
        <div
          className="relative w-full flex flex-wrap gap-2 border-b-2 border-blue-500"
          onKeyDown={handleKeyDown}
        >
          {selectedUsers.length > 0 &&
            selectedUsers.map((user, index) => (
              <UserItem
                key={index}
                name={user.name}
                image={user.image}
                onClose={() => {
                  setSelectedUsers((prev) =>
                    prev.filter((u) => u.name !== user.name)
                  );
                }}
                tabIndex={index + 1} 
              />
            ))}

          <div className="relative p-0">
            <input
              className="min-w-[35px] border-none outline-none bg-transparent"
              type="text"
              placeholder="Add a new user"
              value={searchName}
              onChange={handleSearch}
              onFocus={() => setShowSuggestions(true)}
              ref={inputRef}
              tabIndex={selectedUsers.length + 1} 
            />
            {showSuggestions && (
              <div
                className="absolute top-full left-0 right-0 z-10 flex flex-col w-fit bg-white border  max-h-[200px] overflow-y-auto no-scrollbar"
                ref={suggestionsRef}
              >
                {users?.map((user, index) => (
                  <UserSuggestionsItems
                    key={index}
                    name={user.name}
                    image={user.image}
                    email={user.email}
                    searchCharacters={searchName}
                    isSelected={index === selectedSuggestionIndex}
                    tabIndex={selectedUsers.length + index + 2} 
                    onClick={() => {
                      setSelectedUsers((prev) => [...prev, user]);
                      setUsers((prev) => prev.filter((u) => u.name !== user.name));
                      setSearchName("");
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}