"use client";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./swagger.css";

export default function ApiDocs() {
  const spec = {
    openapi: "3.0.0",
    info: {
      title: "LOTR Card Database API",
      version: "1.0.0",
      description: "API for accessing Lord of the Rings card data",
    },
    servers: [
      {
        url: "/api",
        description: "API Server",
      },
    ],
    paths: {
      "/cards": {
        get: {
          summary: "Get all cards",
          description:
            "Returns a list of LOTR cards with pagination and filtering options",
          parameters: [
            {
              name: "page",
              in: "query",
              description: "Page number",
              schema: { type: "integer", default: 1 },
            },
            {
              name: "limit",
              in: "query",
              description: "Number of items per page",
              schema: { type: "integer", default: 12 },
            },
            {
              name: "edition",
              in: "query",
              description: "Filter by edition (set_id)",
              schema: { type: "string" },
            },
            {
              name: "minStrength",
              in: "query",
              description: "Minimum strength value",
              schema: { type: "integer" },
            },
            {
              name: "maxStrength",
              in: "query",
              description: "Maximum strength value",
              schema: { type: "integer" },
            },
            {
              name: "minVitality",
              in: "query",
              description: "Minimum vitality value",
              schema: { type: "integer" },
            },
            {
              name: "maxVitality",
              in: "query",
              description: "Maximum vitality value",
              schema: { type: "integer" },
            },
            {
              name: "minTwilight",
              in: "query",
              description: "Minimum twilight cost",
              schema: { type: "integer" },
            },
            {
              name: "maxTwilight",
              in: "query",
              description: "Maximum twilight cost",
              schema: { type: "integer" },
            },
            {
              name: "kind",
              in: "query",
              description: "Filter by kind (Free Peoples, Shadow, Neutral)",
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/Card",
                        },
                      },
                      meta: {
                        type: "object",
                        properties: {
                          totalItems: { type: "integer" },
                          itemsPerPage: { type: "integer" },
                          currentPage: { type: "integer" },
                          totalPages: { type: "integer" },
                        },
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/cards/{id}": {
        get: {
          summary: "Get card by ID",
          description: "Returns a single LOTR card by its ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Card ID",
              schema: { type: "integer" },
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Card",
                  },
                },
              },
            },
            "404": {
              description: "Card not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Card: {
          type: "object",
          properties: {
            id: { type: "integer" },
            card_id: { type: "string" },
            card_name: { type: "string" },
            card_image: { type: "string", nullable: true },
            set_name: { type: "string", nullable: true },
            set_id: { type: "string", nullable: true },
            rarity: { type: "string" },
            card_number: { type: "string", nullable: true },
            type: { type: "string", nullable: true },
            subtype: { type: "string", nullable: true },
            game_text: { type: "string", nullable: true },
            flavor_text: { type: "string", nullable: true },
            twilight: { type: "number", nullable: true },
            strength: { type: "number", nullable: true },
            vitality: { type: "number", nullable: true },
            kind: { type: "string", nullable: true },
            resistance: { type: "number", nullable: true },
            culture: { type: "string", nullable: true },
            home_site: { type: "string", nullable: true },
            created_at: { type: "string" },
          },
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
      <div className="bg-card rounded-lg p-4">
        <SwaggerUI spec={spec} />
      </div>
    </div>
  );
}
