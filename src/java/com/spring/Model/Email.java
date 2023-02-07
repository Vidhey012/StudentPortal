package com.spring.Model;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class Email {
	private String name;
	private Map<String, String> names;
	private String from;
	private String replyTo;
	private String[] to;
	private String[] cc;
	private String[] bcc;
	private Date sentDate;
	private String subject;
	private String text;
	private List<?> attachments;
	private String signature;

	public String getFrom() {
		return this.from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getReplyTo() {
		return this.replyTo;
	}

	public void setReplyTo(String replyTo) {
		this.replyTo = replyTo;
	}

	public String[] getTo() {
		return this.to;
	}

	public void setTo(String[] to) {
		this.to = to;
	}

	public void setTo(String to) {
		this.to = new String[] { to };
	}

	public String[] getCc() {
		return this.cc;
	}

	public void setCc(String[] cc) {
		this.cc = cc;
	}

	public void setCc(String cc) {
		this.cc = new String[] { cc };
	}

	public String[] getBcc() {
		return this.bcc;
	}

	public void setBcc(String[] bcc) {
		this.bcc = bcc;
	}

	public void setBcc(String bcc) {
		this.bcc = new String[] { bcc };
	}

	public Date getSentDate() {
		return this.sentDate;
	}

	public void setSentDate(Date sentDate) {
		this.sentDate = sentDate;
	}

	public String getSubject() {
		return this.subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getText() {
		return this.text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Map<String, String> getNames() {
		return this.names;
	}

	public void setNames(Map<String, String> names) {
		this.names = names;
	}

	public List<?> getAttachments() {
		return this.attachments;
	}

	public void setAttachments(List<?> attachments) {
		this.attachments = attachments;
	}

	public String getSignature() {
		return this.signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}
}
