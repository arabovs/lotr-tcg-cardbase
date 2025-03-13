"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { lotrTcgSets, lotrCardTypes, lotrCultureTypes } from "@/lib/constants";
import { Filter, X } from "lucide-react";

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [edition, setEdition] = useState(searchParams.get("edition") || "");
  const [minStrength, setMinStrength] = useState(
    searchParams.get("minStrength") || ""
  );
  const [maxStrength, setMaxStrength] = useState(
    searchParams.get("maxStrength") || ""
  );
  const [minVitality, setMinVitality] = useState(
    searchParams.get("minVitality") || ""
  );
  const [maxVitality, setMaxVitality] = useState(
    searchParams.get("maxVitality") || ""
  );
  const [minTwilight, setMinTwilight] = useState(
    searchParams.get("minTwilight") || ""
  );
  const [maxTwilight, setMaxTwilight] = useState(
    searchParams.get("maxTwilight") || ""
  );
  const [kind, setKind] = useState(searchParams.get("kind") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [culture, setCulture] = useState(searchParams.get("culture") || "");
  const [name, setName] = useState(searchParams.get("name") || "");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [hasExpanded, setHasExpanded] = useState(false);

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (edition) params.set("edition", edition);
    if (minStrength) params.set("minStrength", minStrength);
    if (maxStrength) params.set("maxStrength", maxStrength);
    if (minVitality) params.set("minVitality", minVitality);
    if (maxVitality) params.set("maxVitality", maxVitality);
    if (minTwilight) params.set("minTwilight", minTwilight);
    if (maxTwilight) params.set("maxTwilight", maxTwilight);
    if (kind) params.set("kind", kind);
    if (type) params.set("type", type);
    if (culture) params.set("culture", culture);
    if (name) params.set("name", name);

    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  };

  const resetFilters = () => {
    setEdition("");
    setMinStrength("");
    setMaxStrength("");
    setMinVitality("");
    setMaxVitality("");
    setMinTwilight("");
    setMaxTwilight("");
    setKind("");
    setType("");
    setCulture("");
    setName("");

    router.push("/");
    setIsFilterVisible(false);
  };

  const handleFilterToggle = () => {
    if (!hasExpanded) {
      setHasExpanded(true);
    }
    setIsFilterVisible(!isFilterVisible);
  };

  const handleValueChange = (setter) => (value) => {
    setter(value);
  };

  useEffect(() => {
    applyFilters();
  }, [
    edition,
    minStrength,
    maxStrength,
    minVitality,
    maxVitality,
    minTwilight,
    maxTwilight,
    kind,
    type,
    culture,
    name,
  ]);

  const kindOptions = ["Free Peoples", "Shadow", "Neutral"];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  };

  return (
    <>
      <div className="lg:hidden mb-4">
        <Button
          onClick={handleFilterToggle}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Card
        className={`${
          isFilterVisible ? "block" : "hidden"
        } lg:block sticky top-4`}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex justify-between items-center">
            <span>Filters</span>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsFilterVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Card Name</Label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search by card name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="culture">Culture</Label>
            <Select
              value={culture}
              onValueChange={handleValueChange(setCulture)}
            >
              <SelectTrigger id="culture">
                <SelectValue placeholder="All cultures" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cultures</SelectItem>
                {lotrCultureTypes.map((culture) => (
                  <SelectItem key={culture} value={culture}>
                    {culture}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={handleValueChange(setType)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {lotrCardTypes.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edition">Edition</Label>
            <Select
              value={edition}
              onValueChange={handleValueChange(setEdition)}
            >
              <SelectTrigger id="edition">
                <SelectValue placeholder="All editions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All editions</SelectItem>
                {Object.entries(lotrTcgSets).map(([id, name]) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="kind">Kind</Label>
            <Select value={kind} onValueChange={handleValueChange(setKind)}>
              <SelectTrigger id="kind">
                <SelectValue placeholder="All kinds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All kinds</SelectItem>
                {kindOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Twilight Cost</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="minTwilight" className="text-xs">
                  Min
                </Label>
                <Input
                  id="minTwilight"
                  type="number"
                  value={minTwilight}
                  onChange={(event) => {
                    setMinTwilight(event.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Min"
                />
              </div>
              <div>
                <Label htmlFor="maxTwilight" className="text-xs">
                  Max
                </Label>
                <Input
                  id="maxTwilight"
                  type="number"
                  value={maxTwilight}
                  onChange={(event) => {
                    setMaxTwilight(event.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Strength</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="minStrength" className="text-xs">
                  Min
                </Label>
                <Input
                  id="minStrength"
                  type="number"
                  value={minStrength}
                  onChange={(event) => {
                    setMinStrength(event.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Min"
                />
              </div>
              <div>
                <Label htmlFor="maxStrength" className="text-xs">
                  Max
                </Label>
                <Input
                  id="maxStrength"
                  type="number"
                  value={maxStrength}
                  onChange={(event) => {
                    setMaxStrength(event.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Vitality</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="minVitality" className="text-xs">
                  Min
                </Label>
                <Input
                  id="minVitality"
                  type="number"
                  value={minVitality}
                  onChange={(event) => {
                    setMinVitality(event.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Min"
                />
              </div>
              <div>
                <Label htmlFor="maxVitality" className="text-xs">
                  Max
                </Label>
                <Input
                  id="maxVitality"
                  type="number"
                  value={maxVitality}
                  onChange={(event) => {
                    setMaxVitality(event.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button onClick={applyFilters}>Apply</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
