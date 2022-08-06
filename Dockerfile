FROM node:14

EXPOSE 3000

WORKDIR /usr/src/app

# https://www.gyanblog.com/javascript/nextjs-how-build-docker-with-api-url/
# ARG
ARG SPACE_ID
ARG ACCESS_TOKEN
ARG PREVIEW_ACCESS_TOKEN

ARG EMAILUSER
ARG EMAILPASS
ARG TO
ARG GA

# ENV
ENV SPACE_ID=$SPACE_ID
ENV ACCESS_TOKEN=$ACCESS_TOKEN
ENV PREVIEW_ACCESS_TOKEN=$PREVIEW_ACCESS_TOKEN

ENV EMAILUSER=$EMAILUSER
ENV EMAILPASS=$EMAILPASS
ENV TO=$TO
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS=$GA

# Copy all of the content from the project to the image
COPY . .

RUN npm i
RUN npm run build

# And finally the command to run the application
CMD ["npm", "start"]