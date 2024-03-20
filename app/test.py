from googlesearch import search

def get_linkedin_links(query, num_results=5):
    linkedin_links = []
    try:
        # Perform Google search
        results = search(query, num_results=num_results, stop=num_results, pause=2)

        # Filter and store LinkedIn links
        for result in results:
            if "linkedin.com" in result:
                linkedin_links.append(result)

        # Display LinkedIn links
        if linkedin_links:
            print(f"LinkedIn links for '{query}':")
            for i, link in enumerate(linkedin_links, start=1):
                print(f"{i}. {link}")
        else:
            print(f"No LinkedIn links found for '{query}'.")

    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
search_query = "Python developer"
get_linkedin_links(search_query)
