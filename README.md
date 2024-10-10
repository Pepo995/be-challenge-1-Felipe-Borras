# Back-end Challenge 1

## What MUST be used

- [MongoDB][mongodb-url], using [mongoose][mongoose-url].
- [GraphQL][graphql-url], using [Apollo GraphQL][apollo-graphql-url].
- Javascript, Typescript is a plus but not required.

## What is NOT allowed

- No big frameworks such as Next.js, Nest, Meteor and such.

## The test

Create a basic event management system (no need to implement a user system) where you can create, update, delete, view and list locations and events.

### Data Structure

- Locations should have a `name`.
- Each event should have:
  - `name`
  - `date/time`
  - `type`
  - `location`
  - `description`
  - `tags`

### Requirements

- The application should allow the querying of upcoming events by location;
- The location of an event should not be updatable after it's been created;
- An event cannot be updated or deleted after the date/time passed;
- Metadata such as created and updated date should be stored and be available to query;
- The listing endpoints should:
  - Require a Location;
  - Be sortable by date/time and name both ways (ascending and descending);
  - Be paginated;
  - Be searchable by `name`.
- The Location type should one of:
  - `class`
  - `1-on-1`
  - `workshop`
- Locations should be previously created and referenced in the events by their ID field.
- All Location fields are required except `tags`.
- The Location `name` field should accept:
  - Alphanumerical characters;
  - Only `-` as a special character.

### What is NOT required

- No UI is needed. Showing the mutations and query usages through Apollo Studio is what we are looking for.

## Tip

Though not required, it is strongly advised that you create a developer diary for the task including any relevant details, questions that you might have about the requirements, how you got around issues, the decisions you made etc.

If you dont't know a particular tech that is required, **be honest** and mention about it on the above.

Do your best and have fun!

[mongodb-url]: https://www.mongodb.com/
[mongoose-url]: https://mongoosejs.com/
[graphql-url]: https://graphql.org/
[apollo-graphql-url]: https://www.apollographql.com/

# Developer Diary

---

## Details & Requirements

- **Stack:** MongoDB (Mongoose), GraphQL (Apollo), TypeScript.
- **Data Structure:**
  - Locations should have a name.
  - Events include name, date/time, type, location, description, and tags.
  - Important constraints: Locations must be pre-created, and event locations cannot be updated once created. Events can't be modified or deleted after the event date.

## Initial Structure Setup

- Organized the project with the following structure:
  - **`config/`**: Handles database connection.
  - **`helpers/`**: For initial data creation (seeding).
  - **`middlewares/`**: For error handling.
  - **`models/`**: Contains MongoDB schemas.
  - **`resolvers/`**: For GraphQL resolvers.
  - **`types/`**: For GraphQL type definitions.
  - **`server.ts`**: Main entry point for the server and DB connection.

## Decisions Made | Assumptions

- **Separate GraphQL files by entity:**  
  I decided to split `typeDefs` and `resolvers` for `events` and `locations` into their own files (`event.ts`, `location.ts`). This helps maintain a clean structure and avoids clutter. In `index.ts`, these parts are merged back together.
- **Database Initialization Functionality:**  
  I created a separate connection function (`connectDB`) in `/config/db.ts`. This ensures the database is connected when the server starts and also seeds initial data using `helpers/initialData.ts`. This decision ensures that the database and seed creation are handled at startup.
- **Assumption on Listing Endpoints:**  
  I assume that the requirement for "The listing endpoints should" refers solely to events, as the first sub-point states that a location is required.
- **Default Pagination Limit:**  
  Since the limit for pagination was not specified, I set it to 10 by default.
- **Clarification on Location Type:**  
  Regarding the point "The Location type should be one of: class, 1-on-1, workshop," I assume this is actually referring to event types, as the Data Structure specifies that Location only needs a name. The options listed align more logically with event types rather than location types.

## Challenges & Workarounds

1. **Handling Mongoose Connections and Seeding Data:**  
   I wanted the server to ensure that some initial data (seeds) is available if the database is empty. So, I added a function to run seeds after connecting to MongoDB.
2. **GraphQL Types and Resolvers:**  
   I struggled initially to decide whether to merge the type definitions and resolvers directly in a single file or separate them for better readability. Opting for separation by entity (events and locations) felt cleaner, especially for future scalability.

## Unresolved Questions

- I wasn't sure if pagination and sorting (required for event listing) should be handled directly in GraphQL or offloaded to Mongoose queries. I ended up doing it with Mongoose querying.
- I would have liked to extract the types of the inputs from the TypeDefs that are within types to avoid having to define them twice. I couldn't find a way to do this. Is there a recommended technique or pattern to prevent type duplication between TypeScript and GraphQL?
- In the error handling with _GraphQLError_, I noticed that _GraphQLError_ is always returning a status code (obtained from _error.extensions?.statusCode_) of 500. While the errors are being handled properly, the error code remains the same. I didn't have time to fully investigate why this is happening. Is there a common reason for this behavior?

---

## Future Enhancements / Nice to Haves

- **API Tests:** I didn't have time to implement tests for the API, which would be beneficial for ensuring reliability and functionality.
