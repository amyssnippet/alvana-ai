"use client"

import React, { useState } from "react"
import { Button } from
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function App() {
  const [name, setName] = useState("")
  const [feedbackType, setFeedbackType] = useState("")
  const [rating, setRating] = useState("")
  const [comments, setComments] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ name, feedbackType, rating, comments })
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">AI Platform Feedback</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="feedbackType">Feedback Type</Label>
          <Select value={feedbackType} onValueChange={setFeedbackType} required>
            <SelectTrigger id="feedbackType">
              <SelectValue placeholder="Select feedback type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="bug">Bug Report</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Select value={rating} onValueChange={setRating} required>
            <SelectTrigger id="rating">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 - Poor</SelectItem>
              <SelectItem value="2">2 - Fair</SelectItem>
              <SelectItem value="3">3 - Average</SelectItem>
              <SelectItem value="4">4 - Good</SelectItem>
              <SelectItem value="5">5 - Excellent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="comments">Comments</Label>
          <Textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Please provide your feedback here"
            className="h-32"
          />
        </div>
        <Button type="submit" className="w-full">Submit Feedback</Button>
      </form>
    </div>
  )
}