package br.com.remomeurumo.config;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

@WebFilter(urlPatterns = "/*")
public class DefaultFilter implements Filter {

	public void init(FilterConfig fConfig) throws ServletException {
	}

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		String uri = ((HttpServletRequest) request).getRequestURI();
		if (uri.contains(".")) {
			chain.doFilter(request, response);
		} else if(uri.contains("/api/")) {
			chain.doFilter(request, response);
		} else {
			request.getRequestDispatcher("index.html").forward(request,
					response);
		}
	}

}
