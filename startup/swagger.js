const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vidly API",
      version: "1.0.0",
      description: "Movie rental backend API built using express and swagger",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http;//localhost:300/",
        description: process.env.NODE_ENV === "production" ? "Production server" : "Local development",
      },
    ],

    components: {
      schemas: {
        Customer: {
          type: "object",
          properties: {
            name: { type: "string" },
            phone: { type: "string" },
            isGold: { type: "boolean" }, // Changed to boolean
          },
          required: ["name", "phone"],
        },
        Genre: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
          required: ["name"],
        },
        Movie: {
          type: "object",
          properties: {
            title: { type: "string" },
            numberInStock: { type: "number" },
            dailyRentalRate: { type: "number" },
            genreid: {
              type: "string",
              description: "ID of the genre",
              example: "64f1be194cf762215c7e720f"
            }
          },
          required: ["title", "numberInStock", "dailyRentalRate", "genre"],
        },
        Rental: {
          type: "object",
          properties: {
            customer: { $ref: "#/components/schemas/Customer" }, // Corrected reference
            movie: { $ref: "#/components/schemas/Movie" }, // Corrected reference
            dateOut: { type: "string", format: "date-time" }, // Corrected type
            dateReturned: { type: "string", format: "date-time" }, // Corrected type
            rentalFee: { type: "number" },
          },
          required: ["customer", "movie"],
        },
        RentalInput: {
          type: "object",
          properties: {
            movieId: {
              type: "string",
              description: "ID of the movie",
              example: "64f1be194cf762215c7e720f"
            },
            customerId: {
              type: "string",
              description: "ID of the movie",
              example: "64f1be194cf762215c7e720f"
            }
          }
        },
        User: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" }, // Added email format
            password: { type: "string" },
            isAdmin: { type: "boolean" }, // Changed to boolean
          },
          required: ["name", "email", "password"],
        },
        LoginRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string"}
          },
          required: ["email", "password"]
        },
        Home: {
          type: "string",
          properties: {

          }
        }
      },
    },
  },
  apis: ["./routes/*.js"], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
