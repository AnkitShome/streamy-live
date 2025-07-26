"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScissorsIcon, VideoIcon, PlayIcon, RotateCcwIcon, ClockIcon } from "lucide-react"

export default function HighlightPage() {
  const [files, setFiles] = useState<string[]>([])
  const [selected, setSelected] = useState("")
  const [start, setStart] = useState<number>(0)
  const [end, setEnd] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    fetch("/api/list-recordings")
      .then((res) => res.json())
      .then((data) => setFiles(data.files || []))
      .catch(() => setFiles([]))
  }, [])

  const handleVideoLoad = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration
      setDuration(videoDuration)
      setStart(0)
      setEnd(Math.min(30, videoDuration)) // Default to 30 seconds or video duration
    }
  }

  const setCurrentTimeAsStart = () => {
    if (!videoRef.current) return
    const currentTime = videoRef.current.currentTime
    setStart(currentTime)
    if (currentTime >= end) {
      setEnd(Math.min(currentTime + 10, duration)) // Set end 10 seconds later
    }
  }

  const setCurrentTimeAsEnd = () => {
    if (!videoRef.current) return
    const currentTime = videoRef.current.currentTime
    setEnd(currentTime)
    if (currentTime <= start) {
      setStart(Math.max(currentTime - 10, 0)) // Set start 10 seconds earlier
    }
  }

  const jumpToTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  const previewSegment = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = start
      videoRef.current.play()

      // Stop at end time
      const checkTime = () => {
        if (videoRef.current && videoRef.current.currentTime >= end) {
          videoRef.current.pause()
        } else {
          requestAnimationFrame(checkTime)
        }
      }
      checkTime()
    }
  }

  const resetTimes = () => {
    setStart(0)
    setEnd(Math.min(30, duration))
  }

  const handleStartChange = (value: string) => {
    const time = parseTimeString(value)
    if (time !== null && time >= 0 && time < duration) {
      setStart(time)
      if (time >= end) {
        setEnd(Math.min(time + 10, duration))
      }
    }
  }

  const handleEndChange = (value: string) => {
    const time = parseTimeString(value)
    if (time !== null && time > 0 && time <= duration) {
      setEnd(time)
      if (time <= start) {
        setStart(Math.max(time - 10, 0))
      }
    }
  }

  const handleSubmit = async () => {
    if (!selected || start >= end) return

    setUploading(true)
    try {
      const res = await fetch("/api/clip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: selected,
          start: formatTime(start),
          end: formatTime(end),
        }),
      })

      const data = await res.json()
      if (data.url) {
        setUrl(data.url)
      } else {
        alert(data.error || "Something went wrong")
      }
    } catch (error) {
      alert("Failed to process video")
    } finally {
      setUploading(false)
    }
  }

  const segmentDuration = end - start

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <VideoIcon className="w-5 h-5" />
            Highlight Creator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Select a Recording</Label>
            <Select onValueChange={setSelected}>
              <SelectTrigger>
                <SelectValue placeholder="Choose .mp4 file" />
              </SelectTrigger>
              <SelectContent>
                {files.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selected && (
            <div className="space-y-4">
              <video
                ref={videoRef}
                src={`/recordings/${selected}`}
                controls
                onLoadedMetadata={handleVideoLoad}
                className="rounded-lg w-full max-h-[400px] border shadow-sm"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" />
                      <Label className="font-medium">Start Time</Label>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={formatTime(start)}
                        onChange={(e) => handleStartChange(e.target.value)}
                        placeholder="00:00:00"
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={setCurrentTimeAsStart}
                        title="Set current video time as start"
                      >
                        Set
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => jumpToTime(start)} title="Jump to start time">
                        <PlayIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" />
                      <Label className="font-medium">End Time</Label>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={formatTime(end)}
                        onChange={(e) => handleEndChange(e.target.value)}
                        placeholder="00:00:30"
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={setCurrentTimeAsEnd}
                        title="Set current video time as end"
                      >
                        Set
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => jumpToTime(end)} title="Jump to end time">
                        <PlayIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Segment Duration:</span> {formatTime(segmentDuration)}
                  {segmentDuration > 0 && (
                    <span className="ml-2">
                      ({formatTime(start)} → {formatTime(end)})
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={previewSegment} disabled={segmentDuration <= 0}>
                    <PlayIcon className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetTimes}>
                    <RotateCcwIcon className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>

              <Button onClick={handleSubmit} disabled={uploading || segmentDuration <= 0} className="w-full" size="lg">
                <ScissorsIcon className="w-4 h-4 mr-2" />
                {uploading ? "Processing..." : `Create ${formatTime(segmentDuration)} Highlight`}
              </Button>

              {url && (
                <Card className="p-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Generated Highlight</Label>
                    <video src={url} controls className="rounded-md border shadow w-full max-h-[300px]" />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(url)}>
                        Copy URL
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const a = document.createElement("a")
                          a.href = url
                          a.download = `highlight-${selected}`
                          a.click()
                        }}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

function parseTimeString(timeStr: string): number | null {
  const parts = timeStr.split(":")
  if (parts.length !== 3) return null

  const hours = Number.parseInt(parts[0], 10)
  const minutes = Number.parseInt(parts[1], 10)
  const seconds = Number.parseInt(parts[2], 10)

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return null
  if (minutes >= 60 || seconds >= 60) return null

  return hours * 3600 + minutes * 60 + seconds
}
