"use client"

import React, { useState, useCallback } from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  company: string;
  image: string;
}

interface TeamDisplayProps {
  teamData: TeamMember[];
  boardData: TeamMember[];
  chinaData?: TeamMember[];
}

const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj";

const OBJECT_POSITIONS: Record<string, string> = {
  "Kai Zheng": "object-[center_20%]",
  "Waseem Khalayleh": "object-[center_60%]",
  "Xiaolong Ma": "object-[center_40%]",
  "Rejeesh Raveendran": "object-[35%_center]",
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-[#2b1c48] mb-6">{title}</h2>
      <div className="flex gap-2">
        <div className="h-1 w-20 bg-[#5E366D] rounded-full" />
        <div className="h-1 w-12 bg-[#EE8900] rounded-full" />
      </div>
    </div>
  );
}

function MemberCard({
  member,
  index,
  keyPrefix,
}: {
  member: TeamMember;
  index: number;
  keyPrefix: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const objectPos = OBJECT_POSITIONS[member.name] ?? "object-center";
  const imageKey = `${keyPrefix}-${index}`;

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => setErrored(true), []);

  return (
    <div
      key={imageKey}
      id={toSlug(`${member.name}-${member.role}`)}
      className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full"
    >
      <div className="relative mb-4 rounded-xl w-full aspect-[5/6] overflow-hidden bg-gray-100 flex-shrink-0">
        {!loaded && (
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}
        <Image
          src={errored ? "/placeholder.jpg" : member.image}
          alt={`${member.name} - ${member.role} at ${member.company}`}
          fill
          className={`object-cover ${objectPos} transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading={index < 3 ? "eager" : "lazy"}
          priority={index < 3}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-[#2b1c48] mb-2 line-clamp-2">
          {member.name}
        </h3>
        <div className="flex gap-2 mb-3">
          <div className="h-1 w-16 bg-[#5E366D] rounded-full" />
          <div className="h-1 w-8 bg-[#EE8900] rounded-full" />
        </div>
        <p className="text-[#EE8900] font-semibold mb-2 text-sm sm:text-base line-clamp-2">
          {member.role}
        </p>
        <p className="text-[#5E366D] font-medium text-base sm:text-lg line-clamp-1">
          {member.company}
        </p>
      </div>
    </div>
  );
}

function MemberGrid({
  members,
  keyPrefix,
}: {
  members: TeamMember[];
  keyPrefix: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {members.map((member, index) => (
        <MemberCard
          key={`${keyPrefix}-${index}`}
          member={member}
          index={index}
          keyPrefix={keyPrefix}
        />
      ))}
    </div>
  );
}

export function TeamDisplay({ teamData, boardData, chinaData = [] }: TeamDisplayProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="w-full max-w-7xl relative z-10">
        <div className="mb-12">
          <SectionHeader title="United Arab Emirates - Headquarters" />
          <MemberGrid members={boardData} keyPrefix="board" />
        </div>

        {teamData.length > 0 && (
          <div className="mb-12">
            <SectionHeader title="Kingdom of Saudi Arabia" />
            <MemberGrid members={teamData} keyPrefix="ksa" />
          </div>
        )}

        {chinaData.length > 0 && (
          <div className="mb-12">
            <SectionHeader title="People's Republic of China" />
            <MemberGrid members={chinaData} keyPrefix="china" />
          </div>
        )}
      </div>
    </div>
  );
}
